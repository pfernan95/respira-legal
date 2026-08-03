#!/usr/bin/env python3
"""
Instance the variable woff2 fonts to static TTFs for the OG image generator
(resvg does not apply variable woff2). Writes to .cache/fonts/ (gitignored),
which tools/generate-og-image.mjs reads via OG_FONT_DIR.

Prereq:  pip install fonttools brotli
Run:     python3 tools/instance-fonts.py
"""
import os
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

SRC = "src/assets/fonts"
OUT = ".cache/fonts"
os.makedirs(OUT, exist_ok=True)

JOBS = [
    ("fraunces-latin-wght-normal.woff2", "fraunces-display.ttf", {"wght": 600}),
    ("ibm-plex-sans-latin-wght-normal.woff2", "plex-regular.ttf", {"wght": 400}),
    ("ibm-plex-sans-latin-wght-normal.woff2", "plex-semibold.ttf", {"wght": 600}),
]

for src, out, axes in JOBS:
    f = TTFont(os.path.join(SRC, src))
    instantiateVariableFont(f, axes, inplace=True)
    f.flavor = None
    f.save(os.path.join(OUT, out))
    print("wrote", os.path.join(OUT, out))
