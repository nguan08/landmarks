"""Build a shareable 3-page A4 brochure for Buriram Night & Glow."""
from pathlib import Path

import qrcode
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path(r"C:\Users\nguan\Desktop\Desk\landmarks")
PUBLIC = ROOT / "public"
OUT = ROOT / "public" / "buriram-night-glow-brochure.pdf"
DESKTOP = Path(r"C:\Users\nguan\Desktop") / "Buriram-Night-and-Glow-Brochure.pdf"
QR_PATH = ROOT / "tmp-brochure-qr.png"

pdfmetrics.registerFont(TTFont("Thai", r"C:\Windows\Fonts\LeelawUI.ttf"))
pdfmetrics.registerFont(TTFont("ThaiBold", r"C:\Windows\Fonts\LeelaUIb.ttf"))

W, H = A4
BG = (0.035, 0.035, 0.04)
AMBER = (1.0, 0.69, 0.125)
PINK = (1.0, 0.18, 0.58)
CYAN = (0.0, 0.94, 1.0)
WHITE = (0.97, 0.97, 0.98)
MUTED = (0.65, 0.67, 0.70)
CARD = (0.08, 0.08, 0.09)

ROOMS = [
    ("#FF2E93", "JELLY ROOM", "ห้องหิ่งห้อยเรืองแสง", "จุดถ่ายรูป หิ่งห้อยเรืองแสง"),
    ("#00F0FF", "SPACEY", "พื้นที่วางเปล่า", "โซนเปิดว่างในอาคาร"),
    ("#FFB020", "WIZARD PHOTO", "ภาพมีมนตรา", "ภาพเรืองแสงจุดถ่ายรูปยอดฮิต"),
    ("#10B981", "FAIRY FOREST", "ป่าภูตแห่งแสง และ life steam", "ป่าแฟนตาซี เห็ดเรืองแสง น้ำตกแห่งแสง"),
    ("#A855F7", "MYSTIC CRANE & BOX", "นกกระเรียนมนตราและกล่องปริศนา", "ภาพนกกระเรียนและกล่องไฟเรขาคณิต"),
    ("#EF4444", "HORROR STAIR", "บันไดหลอน", "จุดถ่ายภาพหลอน เขตห้ามเข้า"),
    ("#F59E0B", "CHILL AREA", "พื้นที่พักผ่อนและจิบเครื่องดื่ม", "โซนนั่งชิลล์ฟังเพลง แสงสลัว"),
    ("#FFB020", "LUMINOUS ALLEY", "ถนนราตรีเรืองแสง", "black light เพ้นตัวและหน้าเรืองแสง"),
]

PINS = [
    ("ธานี เฮอริเทจ", "18.30–24.00", "อาคารมรดก จุดเปิดไฟสถาปัตยกรรม"),
    ("มูลนิธิสว่างจรรยาธรรมสถาน", "18.00–23.30", "จุดจัดแสงไฟศาลเจ้ายามค่ำคืน"),
    ("12 นักษัตรเรืองแสง", "17.30–24.00", "รูปปั้น 12 นักษัตรเรืองแสง"),
    ("ตลาดเรืองแสง", "18.00–24.00", "เวทีดนตรีและตลาดร้านอาหาร"),
    ("หอนาฬิกา", "19.00–24.00", "ซุ้มประตูศิลาขอมเรืองแสง จุดถ่ายภาพ"),
]


def hex_rgb(value: str):
    value = value.lstrip("#")
    return (int(value[0:2], 16) / 255, int(value[2:4], 16) / 255, int(value[4:6], 16) / 255)


def wrap(text: str, font: str, size: float, max_w: float):
    lines, cur = [], ""
    for ch in text:
        test = cur + ch
        if pdfmetrics.stringWidth(test, font, size) <= max_w:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = ch
    if cur:
        lines.append(cur)
    return lines


def fill(c, color):
    c.setFillColorRGB(*color)


def stroke(c, color):
    c.setStrokeColorRGB(*color)


def page_bg(c):
    fill(c, BG)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    fill(c, AMBER)
    c.rect(0, H - 4, W / 3, 4, fill=1, stroke=0)
    fill(c, PINK)
    c.rect(W / 3, H - 4, W / 3, 4, fill=1, stroke=0)
    fill(c, CYAN)
    c.rect(2 * W / 3, H - 4, W / 3, 4, fill=1, stroke=0)


def draw_text(c, text, x, y, font="Thai", size=11, color=WHITE, align="left"):
    fill(c, color)
    c.setFont(font, size)
    if align == "center":
        c.drawCentredString(x, y, text)
    elif align == "right":
        c.drawRightString(x, y, text)
    else:
        c.drawString(x, y, text)


def draw_wrapped(c, text, x, y, max_w, font="Thai", size=10, color=MUTED, leading=None, align="left"):
    leading = leading or size + 4
    lines = wrap(text, font, size, max_w)
    for i, line in enumerate(lines):
        draw_text(c, line, x, y - i * leading, font, size, color, align)
    return len(lines) * leading


def rounded_card(c, x, y, w, h, color=CARD):
    fill(c, color)
    stroke(c, (0.22, 0.22, 0.24))
    c.setLineWidth(0.6)
    c.roundRect(x, y, w, h, 8, fill=1, stroke=1)


def footer(c, page_no, total=3):
    draw_text(c, "landmarks.work", 16 * mm, 8 * mm, "Thai", 8, MUTED)
    draw_text(c, f"{page_no} / {total}", W - 16 * mm, 8 * mm, "Thai", 8, MUTED, "right")


def page_cover(c):
    page_bg(c)
    logo = ImageReader(str(PUBLIC / "thani-heritage-logo.jpg"))
    c.drawImage(logo, W / 2 - 16 * mm, H - 42 * mm, 32 * mm, 32 * mm, preserveAspectRatio=True, mask="auto")

    draw_text(c, "THANI HERITAGE  •  BURIRAM", W / 2, H - 48 * mm, "ThaiBold", 9, AMBER, "center")
    draw_text(c, "BURIRAM", W / 2, H - 66 * mm, "ThaiBold", 36, WHITE, "center")
    draw_text(c, "NIGHT & GLOW", W / 2, H - 80 * mm, "ThaiBold", 30, PINK, "center")
    draw_text(c, "เทศกาลแสงไฟและศิลปะราตรีบุรีรัมย์", W / 2, H - 90 * mm, "Thai", 13, WHITE, "center")

    chips = [
        ("วันที่", "21 สิงหาคม 2569"),
        ("เปิดประตู", "18.30 น."),
        ("สถานที่", "THANI HERITAGE"),
        ("ค่าเข้าชม", "ฟรี"),
    ]
    chip_w = 42 * mm
    gap = 4 * mm
    total_w = 4 * chip_w + 3 * gap
    x0 = (W - total_w) / 2
    y0 = H - 112 * mm
    for i, (label, value) in enumerate(chips):
        x = x0 + i * (chip_w + gap)
        rounded_card(c, x, y0, chip_w, 16 * mm)
        draw_text(c, label, x + chip_w / 2, y0 + 10 * mm, "Thai", 7, MUTED, "center")
        draw_text(c, value, x + chip_w / 2, y0 + 4.2 * mm, "ThaiBold", 8.5, WHITE, "center")

    body = (
        "สัมผัสสถาปัตยกรรมตึกโบราณมรดกของถนนธานี THANI HERITAGE "
        "ด้านในพบกับการจัดแสงผสมผสานกับการทำ visual art จุดถ่ายภาพ และ immersive art "
        "พร้อมกับถนนเรืองแสง การเพ้นตัวและหน้าเรืองแสง (เสื้อสีขาวจะทำให้เรืองแสงและถ่ายภาพสวย) "
        "พร้อมโซนนั่งชิลล์ฟังเพลง ในบรรยากาศแสงสลัว"
    )
    draw_wrapped(c, body, 18 * mm, H - 124 * mm, W - 36 * mm, "Thai", 10, MUTED, 14)

    photo = ImageReader(str(PUBLIC / "building-lit.jpg"))
    ph = 78 * mm
    pw = W - 32 * mm
    c.saveState()
    path = c.beginPath()
    path.roundRect(16 * mm, H - 228 * mm, pw, ph, 10)
    c.clipPath(path, stroke=0)
    c.drawImage(photo, 16 * mm, H - 228 * mm, width=pw, height=ph, preserveAspectRatio=True, anchor="c", mask="auto")
    c.restoreState()
    stroke(c, (0.35, 0.28, 0.12))
    c.setLineWidth(0.8)
    c.roundRect(16 * mm, H - 228 * mm, pw, ph, 10, fill=0, stroke=1)

    # QR + share
    qr = ImageReader(str(QR_PATH))
    rounded_card(c, 16 * mm, 28 * mm, W - 32 * mm, 34 * mm)
    c.drawImage(qr, 20 * mm, 31 * mm, 28 * mm, 28 * mm, mask="auto")
    draw_text(c, "สแกนเพื่อเปิดเว็บ / ส่งต่อลิงก์", 52 * mm, 50 * mm, "ThaiBold", 12, WHITE)
    draw_text(c, "https://landmarks.work", 52 * mm, 43 * mm, "Thai", 11, AMBER)
    draw_text(c, "แผนที่ • ผังห้อง • จุดถ่ายภาพ • รายละเอียดงาน", 52 * mm, 36 * mm, "Thai", 9, MUTED)

    footer(c, 1)


def page_rooms(c):
    page_bg(c)
    draw_text(c, "ภายในอาคาร", 16 * mm, H - 18 * mm, "ThaiBold", 18, WHITE)
    draw_text(c, "ผังห้องจัดแสดง • ชี้หรือจิ้มห้องบนเว็บเพื่อเปิดแสงเวทมนตร์", 16 * mm, H - 26 * mm, "Thai", 9, MUTED)

    plan = ImageReader(str(PUBLIC / "thani-heritage-floorplan.jpg"))
    plan_h = 108 * mm
    plan_top = H - 32 * mm
    plan_y = plan_top - plan_h
    c.saveState()
    path = c.beginPath()
    path.roundRect(16 * mm, plan_y, W - 32 * mm, plan_h, 8)
    c.clipPath(path, stroke=0)
    fill(c, (0.07, 0.07, 0.08))
    c.rect(16 * mm, plan_y, W - 32 * mm, plan_h, fill=1, stroke=0)
    c.drawImage(plan, 16 * mm, plan_y, width=W - 32 * mm, height=plan_h, preserveAspectRatio=True, anchor="c", mask="auto")
    c.restoreState()
    stroke(c, (0.25, 0.25, 0.27))
    c.roundRect(16 * mm, plan_y, W - 32 * mm, plan_h, 8, fill=0, stroke=1)

    y = plan_y - 12 * mm
    col_w = (W - 36 * mm) / 2
    for i, (color, name, name_th, desc) in enumerate(ROOMS):
        col = i % 2
        row = i // 2
        x = 16 * mm + col * (col_w + 4 * mm)
        yy = y - row * 26 * mm
        rounded_card(c, x, yy - 21 * mm, col_w, 24 * mm)
        fill(c, hex_rgb(color))
        c.circle(x + 6 * mm, yy - 8.5 * mm, 2.2 * mm, fill=1, stroke=0)
        draw_text(c, name, x + 12 * mm, yy - 6 * mm, "ThaiBold", 8, WHITE)
        draw_text(c, name_th, x + 12 * mm, yy - 11.8 * mm, "Thai", 8, AMBER)
        draw_wrapped(c, desc, x + 12 * mm, yy - 17.5 * mm, col_w - 16 * mm, "Thai", 7.5, MUTED, 10)

    draw_text(c, "ทิป: ใส่เสื้อสีขาว จะเรืองแสงและถ่ายรูปสวยในโซน black light", 16 * mm, 16 * mm, "Thai", 9, CYAN)
    footer(c, 2)


def page_map(c):
    page_bg(c)
    draw_text(c, "รอบอาคารและจุดไฮไลท์", 16 * mm, H - 18 * mm, "ThaiBold", 18, WHITE)
    draw_text(c, "พิกัด 14.999923, 103.109930  •  ถนนธานี บุรีรัมย์", 16 * mm, H - 26 * mm, "Thai", 9, MUTED)

    y = H - 34 * mm
    for name, time, desc in PINS:
        rounded_card(c, 16 * mm, y - 20 * mm, W - 32 * mm, 19 * mm)
        fill(c, AMBER)
        c.circle(22 * mm, y - 10.5 * mm, 2.0 * mm, fill=1, stroke=0)
        draw_text(c, name, 28 * mm, y - 7.2 * mm, "ThaiBold", 10.5, WHITE)
        draw_text(c, time, W - 20 * mm, y - 7.2 * mm, "Thai", 8.5, CYAN, "right")
        draw_text(c, desc, 28 * mm, y - 14.5 * mm, "Thai", 8.5, MUTED)
        y -= 21.5 * mm

    # sponsors
    draw_text(c, "ผู้สนับสนุนหลัก", 16 * mm, y - 4 * mm, "ThaiBold", 11, MUTED)
    tat = ImageReader(str(PUBLIC / "tat-tourism-logo.png"))
    amazing = ImageReader(str(PUBLIC / "amazing-thailand-logo.png"))
    c.drawImage(tat, 16 * mm, y - 32 * mm, 22 * mm, 22 * mm, preserveAspectRatio=True, mask="auto")
    c.drawImage(amazing, 42 * mm, y - 30 * mm, 42 * mm, 18 * mm, preserveAspectRatio=True, mask="auto")

    draw_text(c, "Supporting Sponsor", 100 * mm, y - 4 * mm, "ThaiBold", 11, MUTED)
    jon = ImageReader(str(PUBLIC / "jon-voranuch-logo.png"))
    tao = ImageReader(str(PUBLIC / "tao-bin-logo.png"))
    super_a = ImageReader(str(PUBLIC / "super-a-logo.png"))
    c.drawImage(jon, 100 * mm, y - 32 * mm, 20 * mm, 20 * mm, preserveAspectRatio=True, mask="auto")
    c.drawImage(tao, 123 * mm, y - 32 * mm, 20 * mm, 20 * mm, preserveAspectRatio=True, mask="auto")
    c.drawImage(super_a, 146 * mm, y - 32 * mm, 20 * mm, 20 * mm, preserveAspectRatio=True, mask="auto")

    y -= 44 * mm
    perk_h = 38 * mm
    rounded_card(c, 16 * mm, y - perk_h, W - 32 * mm, perk_h)
    fill(c, AMBER)
    c.roundRect(16 * mm, y - 2.2 * mm, W - 32 * mm, 2.2 * mm, 0, fill=1, stroke=0)
    draw_text(c, "สิทธิประโยชน์ผู้สนับสนุน", 22 * mm, y - 10 * mm, "ThaiBold", 12, AMBER)
    draw_text(
        c,
        "ผู้สนับสนุนตั้งแต่ 1,000 บาทขึ้นไป",
        22 * mm,
        y - 18 * mm,
        "ThaiBold",
        11,
        WHITE,
    )
    draw_text(
        c,
        "จะได้แสดงโลโก้ 3D หน้างาน  •  ลงโลโก้บนสื่อประชาสัมพันธ์  •  แสดงโลโก้บนเว็บไซต์ landmarks.work",
        22 * mm,
        y - 26 * mm,
        "Thai",
        9,
        MUTED,
    )
    draw_text(
        c,
        "เหมาะสำหรับร้านค้าและแบรนด์ที่อยากให้คนเห็นทั้งในงานและออนไลน์",
        22 * mm,
        y - 33 * mm,
        "Thai",
        8,
        MUTED,
    )

    y -= perk_h + 6 * mm
    rounded_card(c, 16 * mm, y - 34 * mm, W - 32 * mm, 32 * mm)
    qr = ImageReader(str(QR_PATH))
    c.drawImage(qr, 22 * mm, y - 31 * mm, 26 * mm, 26 * mm, mask="auto")
    draw_text(c, "ส่งต่อโบรชัวร์นี้ หรือเปิดเว็บไซต์", 52 * mm, y - 12 * mm, "ThaiBold", 11, WHITE)
    draw_text(c, "https://landmarks.work", 52 * mm, y - 19 * mm, "Thai", 10.5, AMBER)
    draw_text(c, "จัดโดย Landmark LightWork  ณ THANI HERITAGE บุรีรัมย์", 52 * mm, y - 26 * mm, "Thai", 8, MUTED)

    footer(c, 3)


def main():
    qrcode.make("https://landmarks.work").save(QR_PATH)
    c = canvas.Canvas(str(OUT), pagesize=A4)
    c.setTitle("Buriram Night & Glow — THANI HERITAGE")
    c.setAuthor("THANI HERITAGE & Landmark LightWork")
    page_cover(c)
    c.showPage()
    page_rooms(c)
    c.showPage()
    page_map(c)
    c.save()
    DESKTOP.write_bytes(OUT.read_bytes())
    print("WROTE", OUT)
    print("WROTE", DESKTOP)

    import pypdfium2 as pdfium

    jpg_dir = Path(r"C:\Users\nguan\Desktop")
    doc = pdfium.PdfDocument(str(OUT))
    for i, pg in enumerate(doc, start=1):
        img = pg.render(scale=2.2).to_pil().convert("RGB")
        dest = jpg_dir / f"Buriram-Night-and-Glow-{i:02d}.jpg"
        img.save(dest, "JPEG", quality=92, optimize=True)
        print("WROTE", dest)


if __name__ == "__main__":
    main()
