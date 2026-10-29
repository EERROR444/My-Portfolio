"""
Simple Local Server for Aryan Singh Parmar's Portfolio Website.
Run with: python serve.py
It will launch a local server and automatically open the portfolio in your default browser.
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 5500
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"=====================================================")
        print(f"  Aryan Singh Parmar - Portfolio Website Server")
        print(f"  Serving at: {url}")
        print(f"  Press Ctrl+C to stop the server.")
        print(f"=====================================================")
        webbrowser.open(url)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == "__main__":
    run()
