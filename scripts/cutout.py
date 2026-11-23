from pathlib import Path

from PIL import Image
from rembg import new_session, remove

source = Path(
    r"C:\Users\asasv\.cursor\projects\c-Users-asasv-Desktop-Cursor-projects-porto\assets\photo_2026-11-23_12-50-06-a0bfebed-7bbf-4949-ab46-a765be06c77c.jpg"
)
output = Path(r"C:\Users\asasv\Desktop\Cursor projects\porto\public\portrait\peter-toss.png")
output.parent.mkdir(parents=True, exist_ok=True)

image = Image.open(source).convert("RGBA")
longest = max(image.size)
limit = 2000
if longest > limit:
    scale = limit / longest
    image = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)

session = new_session("u2net_human_seg")
cutout = remove(image, session=session)
bounds = cutout.getbbox()
if bounds:
    pad = 18
    left, top, right, bottom = bounds
    cutout = cutout.crop(
        (
            max(0, left - pad),
            max(0, top - pad),
            min(cutout.width, right + pad),
            min(cutout.height, bottom + pad),
        )
    )

cutout.save(output, "PNG")
print(f"{cutout.width}x{cutout.height}")
