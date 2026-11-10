# Tiempos por palabra de la locución con faster-whisper en CPU (gratis, local).
# Uso: python marketing/reels/scripts/reel/transcribir.py --audio voz.wav --idioma es [--modelo small] [--guia "texto"]
# Imprime una sola línea JSON: {"words": [{word, start, end}], "segments": [{start, end, text}]}.
import argparse
import json

from faster_whisper import WhisperModel

p = argparse.ArgumentParser()
p.add_argument("--audio", required=True)
p.add_argument("--idioma", required=True)
p.add_argument("--modelo", default="small")
p.add_argument("--guia", default="")
a = p.parse_args()

modelo = WhisperModel(a.modelo, device="cpu", compute_type="int8")
segmentos, _ = modelo.transcribe(a.audio, language=a.idioma, word_timestamps=True, initial_prompt=a.guia or None, beam_size=5)
palabras = []
salida = []
for s in segmentos:
    salida.append({"start": s.start, "end": s.end, "text": s.text.strip()})
    for w in s.words or []:
        palabras.append({"word": w.word.strip(), "start": w.start, "end": w.end})
print(json.dumps({"words": palabras, "segments": salida}))
