#!/usr/bin/env python3
"""
LAKSHMAN REKHA AI - Local Production & Development Server
Serves the web application with proper MIME types, CORS headers,
and mock/live proxy APIs for hackathon demonstrations.
"""

import http.server
import socketserver
import os
import sys
import mimetypes
import json

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

# Ensure JS modules and images have correct MIME types
mimetypes.init()
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("image/png", ".png")
mimetypes.add_type("image/jpeg", ".jpg")
mimetypes.add_type("image/jpeg", ".jpeg")
mimetypes.add_type("application/json", ".json")

class LakshmanRekhaHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and caching headers for high responsiveness
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        # Optional lightweight API routes
        if self.path == "/api/status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            status_payload = {
                "status": "online",
                "boundary": "ENFORCED",
                "service": "LAKSHMAN REKHA AI GATEWAY",
                "version": "1.0.0-hackathon-mvp"
            }
            self.wfile.write(json.dumps(status_payload).encode('utf-8'))
        else:
            self.send_error(404, "Endpoint not found")

def run_server(port=PORT):
    # Try preferred port, or increment if busy
    current_port = port
    max_attempts = 10
    httpd = None

    for i in range(max_attempts):
        try:
            httpd = socketserver.TCPServer(("", current_port), LakshmanRekhaHandler)
            print("\n========================================================")
            print("  [*] LAKSHMAN REKHA AI - SERVER ACTIVE")
            print("  Tagline: 'Your Digital Boundary for Safe AI'")
            print(f"  URL: http://localhost:{current_port}")
            print("========================================================\n")
            httpd.serve_forever()
            break
        except OSError as e:
            print(f"Port {current_port} is currently in use, trying port {current_port + 1}...")
            current_port += 1

if __name__ == "__main__":
    port_arg = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    run_server(port_arg)
