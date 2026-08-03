#!/usr/bin/env python3
"""
Generate the web favicon set from the REAL app icon (tools/brand-icon.png,
copied verbatim from pfernan95/respira-app assets/icon.png, 1024×1024).
No re-drawing — the web uses the same mark as the app.

Prereq:  pip install Pillow
Run:     python3 tools/generate-icons.py
"""
from PIL import Image

SRC = "tools/brand-icon.png"
icon = Image.open(SRC).convert("RGBA")

for size, out in [(48, "src/favicon.png"), (180, "src/apple-touch-icon.png")]:
    icon.resize((size, size), Image.LANCZOS).save(out, optimize=True)
    print(f"{out} ({size}px)")
