"""Single dense festival poster — not a sparse brochure."""
from pathlib import Path

import qrcode
from PIL import Image, ImageDraw, ImageFilter, ImageFont

PUBLIC = Path(r"C:\Users\nguan\Desktop\Desk\landmarks\public")
OUT = Path(r"C:\Users\nguan\Desktop\Buriram-Night-and-Glow.jpg")
OUT2 = PUBLIC / "buriram-night-glow-poster.jpg"
FONT = r"C:\Windows\Fonts\LeelawUI.ttf"
FONTB = r"C:\Windows\Fonts\LeelaUIb.ttf"

W, H = 1600, 2480
BG = (8, 8, 10)
AMBER = (255, 176, 32)
PINK = (255, 46, 147)
CYAN = (0, 240, 255)
WHITE = (245, 245, 247)
MUTED = (168, 172, 178)
CARD = (18, 18, 20)

ROOMS = [
    ((255, 46, 147), "JELLY ROOM", "ห้องหิ่งห้อยเรืองแสง"),
    ((0, 240, 255), "SPACEY", "พื้นที่วางเปล่า"),
    ((255, 176, 32), "WIZARD PHOTO", "ภาพมีมนตรา"),
    ((16, 185, 129), "FAIRY FOREST", "ป่าภูตแห่งแสง"),
    ((168, 85, 247), "MYSTIC CRANE", "นกกระเรียนมนตรา"),
    ((239, 68, 68), "HORROR STAIR", "บันไดหลอน"),
    ((245, 158, 11), "CHILL AREA", "นั่งชิลล์ฟังเพลง"),
    ((255, 176, 32), "LUMINOUS ALLEY", "ถนนเรืองแสง / เพ้นตัว"),
]
PINS = [
    ("ธานี เฮอริเทจ", "18.30"),
    ("สว่างจรรยาธรรม", "18.00"),
    ("12 นักษัตร", "17.30"),
    ("ตลาดเรืองแสง", "18.00"),
    ("หอนาฬิกา", "19.00"),
]


def font(size, bold=False):
    return ImageFont.truetype(FONTB if bold else FONT, size)


def wrap(draw, text, fnt, max_w):
    lines, cur = [], ""
    for ch in text:
        test = cur + ch
        if draw.textlength(test, font=fnt) <= max_w:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = ch
    if cur:
        lines.append(cur)
    return lines


def rounded(im, radius):
    mask = Image.new("L", im.size, 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle((0, 0, im.size[0] - 1, im.size[1] - 1), radius, fill=255)
    out = im.convert("RGBA")
    out.putalpha(mask)
    return out


def cover(src, box):
    bw, bh = box
    im = src.convert("RGB")
    sw, sh = im.size
    scale = max(bw / sw, bh / sh)
    nw, nh = int(sw * scale), int(sh * scale)
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    left, top = (nw - bw) // 2, (nh - bh) // 2
    return im.crop((left, top, left + bw, top + bh))


def fit(src, box):
    bw, bh = box
    im = src.convert("RGBA")
    sw, sh = im.size
    scale = min(bw / sw, bh / sh)
    nw, nh = max(1, int(sw * scale)), max(1, int(sh * scale))
    return im.resize((nw, nh), Image.Resampling.LANCZOS)


def rrect(draw, xy, r, fill=None, outline=None, width=1):
    draw.rounded_rectangle(xy, r, fill=fill, outline=outline, width=width)


def main():
    canvas = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(canvas)

    # accent bar
    d.rectangle((0, 0, 533, 8), fill=AMBER)
    d.rectangle((533, 0, 1066, 8), fill=PINK)
    d.rectangle((1066, 0, 1600, 8), fill=CYAN)

    # HERO photo
    hero_h = 920
    hero = cover(Image.open(PUBLIC / "building-hero.jpg"), (W, hero_h))
    canvas.paste(hero, (0, 8))
    # cinematic overlays
    overlay = Image.new("RGBA", (W, hero_h), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for i in range(220):
        a = int(210 * (i / 220) ** 1.15)
        od.rectangle((0, hero_h - 220 + i, W, hero_h - 219 + i), fill=(8, 8, 10, a))
    for i in range(90):
        a = int(160 * (1 - i / 90))
        od.rectangle((0, i, W, i + 1), fill=(0, 0, 0, a))
    canvas.paste(Image.alpha_composite(hero.convert("RGBA"), overlay).convert("RGB"), (0, 8))

    d.ellipse((W // 2 - 78, 24, W // 2 + 78, 180), fill=(0, 0, 0))
    logo = cover(Image.open(PUBLIC / "thani-heritage-logo.jpg"), (136, 136))
    canvas.paste(logo, (W // 2 - 68, 34))

    d.text((W // 2, 176), "THANI HERITAGE  •  BURIRAM", font=font(20, True), fill=AMBER, anchor="mt")
    d.text((W // 2, 720), "BURIRAM", font=font(86, True), fill=WHITE, anchor="mt")
    d.text((W // 2, 808), "NIGHT & GLOW", font=font(64, True), fill=PINK, anchor="mt")
    d.text((W // 2, 880), "เทศกาลแสงไฟและศิลปะราตรีบุรีรัมย์", font=font(26), fill=WHITE, anchor="mt")

    # info chips sitting on the photo edge
    chips = [
        ("วันที่", "21 ส.ค. 2569"),
        ("เปิดประตู", "18.30 น."),
        ("สถานที่", "THANI HERITAGE"),
        ("เข้าชม", "ฟรี"),
    ]
    chip_w, chip_h, gap = 360, 78, 16
    total = 4 * chip_w + 3 * gap
    x0 = (W - total) // 2
    y0 = 948
    for i, (lab, val) in enumerate(chips):
        x = x0 + i * (chip_w + gap)
        rrect(d, (x, y0, x + chip_w, y0 + chip_h), 16, fill=(16, 16, 18), outline=(48, 42, 28), width=2)
        d.text((x + chip_w // 2, y0 + 16), lab, font=font(16), fill=MUTED, anchor="mt")
        d.text((x + chip_w // 2, y0 + 42), val, font=font(22, True), fill=WHITE, anchor="mt")

    # body copy — tight block
    body = (
        "สัมผัสสถาปัตยกรรมตึกโบราณมรดกของถนนธานี THANI HERITAGE ด้านในพบกับการจัดแสง "
        "visual art จุดถ่ายภาพ และ immersive art พร้อมถนนเรืองแสง การเพ้นตัวและหน้าเรืองแสง "
        "(เสื้อสีขาวจะเรืองแสงและถ่ายภาพสวย) และโซนนั่งชิลล์ฟังเพลงในบรรยากาศแสงสลัว"
    )
    bf = font(22)
    lines = wrap(d, body, bf, W - 120)
    y = 1050
    for line in lines:
        d.text((W // 2, y), line, font=bf, fill=MUTED, anchor="mt")
        y += 32

    # two-column: floor plan + rooms
    y += 18
    col_gap = 22
    left_w = 900
    right_x = 48 + left_w + col_gap
    right_w = W - right_x - 48
    block_h = 620
    rrect(d, (48, y, 48 + left_w, y + block_h), 20, fill=(14, 14, 16), outline=(40, 40, 44), width=2)
    plan = fit(Image.open(PUBLIC / "thani-heritage-floorplan.jpg"), (left_w - 24, block_h - 24))
    canvas.paste(plan, (48 + (left_w - plan.width) // 2, y + (block_h - plan.height) // 2), plan)

    d.text((right_x, y - 2), "8 โซนในอาคาร", font=font(22, True), fill=WHITE)
    row_h = 72
    ry = y + 34
    for color, en, th in ROOMS:
        rrect(d, (right_x, ry, right_x + right_w, ry + row_h - 8), 14, fill=(16, 16, 18), outline=(36, 36, 40), width=1)
        d.ellipse((right_x + 16, ry + 22, right_x + 36, ry + 42), fill=color)
        d.text((right_x + 50, ry + 12), en, font=font(16, True), fill=WHITE)
        d.text((right_x + 50, ry + 36), th, font=font(18), fill=AMBER)
        ry += row_h

    # around-venue strip
    y = y + block_h + 28
    d.text((48, y), "จุดรอบอาคาร", font=font(22, True), fill=WHITE)
    d.text((W - 48, y), "พิกัด 14.999923, 103.109930", font=font(16), fill=MUTED, anchor="rt")
    y += 36
    pw = (W - 96 - 16 * 4) // 5
    ph = 92
    nf = font(16, True)
    for i, (name, tm) in enumerate(PINS):
        x = 48 + i * (pw + 16)
        rrect(d, (x, y, x + pw, y + ph), 14, fill=(16, 16, 18), outline=(40, 36, 24), width=1)
        nlines = wrap(d, name, nf, pw - 16)
        ny = y + (20 if len(nlines) == 1 else 12)
        for line in nlines[:2]:
            d.text((x + pw // 2, ny), line, font=nf, fill=WHITE, anchor="mt")
            ny += 20
        d.text((x + pw // 2, y + 60), tm + " น.", font=font(17), fill=CYAN, anchor="mt")

    # sponsor + perk
    y += ph + 28
    rrect(d, (48, y, W - 48, y + 268), 20, fill=(16, 16, 18), outline=(48, 40, 20), width=2)
    d.rectangle((48, y, W - 48, y + 8), fill=AMBER)
    d.text((70, y + 24), "ผู้สนับสนุนหลัก", font=font(16), fill=MUTED)
    d.text((820, y + 24), "Supporting Sponsor", font=font(16), fill=MUTED)

    def stamp(name, box, xy):
        im = fit(Image.open(PUBLIC / name), box)
        canvas.paste(im, xy, im if im.mode == "RGBA" else None)

    stamp("tat-tourism-logo.png", (88, 88), (70, y + 50))
    stamp("amazing-thailand-logo.png", (200, 78), (175, y + 56))
    stamp("jon-voranuch-logo.png", (78, 78), (820, y + 52))
    stamp("tao-bin-logo.png", (78, 78), (916, y + 52))
    stamp("super-a-logo.png", (78, 78), (1012, y + 52))

    rrect(d, (70, y + 150, W - 70, y + 248), 14, fill=(28, 22, 10), outline=AMBER, width=2)
    d.text((92, y + 164), "สิทธิประโยชน์ผู้สนับสนุน", font=font(18, True), fill=AMBER)
    perk = "ผู้สนับสนุนตั้งแต่ 1,000 บาทขึ้นไป จะได้แสดงโลโก้ 3D หน้างาน  ลงโลโก้บนสื่อประชาสัมพันธ์  และแสดงบนเว็บไซต์ landmarks.work"
    pf = font(20, True)
    plines = wrap(d, perk, pf, W - 200)
    py = y + 196
    for line in plines:
        d.text((92, py), line, font=pf, fill=WHITE)
        py += 28

    # footer QR — full-width bar so the bottom is not empty
    y += 286
    d.rectangle((0, y - 16, W, H), fill=(12, 12, 14))
    d.rectangle((0, y - 16, W, y - 12), fill=AMBER)
    qr = qrcode.make("https://landmarks.work", box_size=10, border=2).convert("RGB")
    qr = qr.resize((118, 118), Image.Resampling.NEAREST)
    canvas.paste(qr, (48, y))
    d.text((188, y + 18), "สแกนเปิดเว็บ / ส่งต่อ", font=font(22, True), fill=WHITE)
    d.text((188, y + 52), "landmarks.work", font=font(28, True), fill=AMBER)
    d.text((188, y + 92), "Landmark LightWork  ณ  THANI HERITAGE บุรีรัมย์", font=font(16), fill=MUTED)

    canvas = canvas.filter(ImageFilter.UnsharpMask(radius=0.6, percent=80, threshold=2))
    canvas.save(OUT, "JPEG", quality=93, optimize=True, progressive=True)
    canvas.save(OUT2, "JPEG", quality=93, optimize=True, progressive=True)
    print("WROTE", OUT, canvas.size)


if __name__ == "__main__":
    main()
