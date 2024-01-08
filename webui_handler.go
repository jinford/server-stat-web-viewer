package main

import (
	"embed"
	"errors"
	"io"
	"mime"
	"net/http"
	"path"
	"path/filepath"
)

//go:embed all:webui/dist
var assets embed.FS

var ErrDir = errors.New("path is dir")

type WebUIHandler struct{}

func NewWebUIHandler() *WebUIHandler {
	return &WebUIHandler{}
}

func (h *WebUIHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	err := tryRead(assets, "webui/dist", r.URL.Path, w)
	if err == nil {
		return
	}

	if err := tryRead(assets, "webui/dist", "index.html", w); err != nil {
		panic(err)
	}
}

func tryRead(fs embed.FS, prefix, requestedPath string, w http.ResponseWriter) error {
	f, err := fs.Open(path.Join(prefix, requestedPath))
	if err != nil {
		return err
	}
	defer f.Close()

	stat, _ := f.Stat()
	if stat.IsDir() {
		return ErrDir
	}

	contentType := mime.TypeByExtension(filepath.Ext(requestedPath))
	w.Header().Set("Content-Type", contentType)
	if _, err := io.Copy(w, f); err != nil {
		panic(err)
	}

	return nil
}
