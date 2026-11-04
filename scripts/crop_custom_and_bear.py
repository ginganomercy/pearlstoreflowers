import os
import shutil
from PIL import Image

BASE_DIR = r"c:\Users\RAFLY A.R\Downloads\shelwa_craft"
WEB_DIR = os.path.join(BASE_DIR, "pearl-store-web")
PRODUCTS_DIR = os.path.join(WEB_DIR, "public", "images", "products")
SHEETS_DIR = os.path.join(WEB_DIR, "public", "images", "sheets")

os.makedirs(PRODUCTS_DIR, exist_ok=True)
os.makedirs(SHEETS_DIR, exist_ok=True)

# Grid definition:
# 4 columns: [30, 353], [353, 676], [676, 999], [999, 1321]
COLS = [
    (30, 353),
    (353, 676),
    (676, 999),
    (999, 1321),
]

# Rows:
# Row 1: y in [122, 444]
# Row 2: y in [642, 964]
ROW1_Y = (122, 444)
ROW2_Y = (642, 964)

CUSTOM_CONFIG = [
    # Row 1
    {"col": 0, "row": 1, "filename": "buket-toper.png", "title": "Buket Toper"},
    {"col": 1, "row": 1, "filename": "buket-coklat-5pcs.png", "title": "Buket Coklat 5 Pcs"},
    {"col": 2, "row": 1, "filename": "buket-snack.png", "title": "Buket Snack"},
    {"col": 3, "row": 1, "filename": "buket-snack-jumbo.png", "title": "Buket Snack Jumbo"},
    # Row 2
    {"col": 0, "row": 2, "filename": "snack-kopi.png", "title": "Snack & Kopi"},
    {"col": 1, "row": 2, "filename": "buket-rokok.png", "title": "Buket Rokok"},
    {"col": 2, "row": 2, "filename": "rokok-kopi.png", "title": "Rokok & Kopi"},
    {"col": 3, "row": 2, "filename": "buket-balon.png", "title": "Buket Balon"},
]

BEAR_CONFIG = [
    # Row 1
    {"col": 0, "row": 1, "filename": "bearlyn.png", "title": "Bearlyn"},
    {"col": 1, "row": 1, "filename": "matdoll.png", "title": "Matdoll"},
    {"col": 2, "row": 1, "filename": "sweety-mini.png", "title": "Sweety Mini"},
    {"col": 3, "row": 1, "filename": "flowy.png", "title": "Flowy"},
    # Row 2
    {"col": 0, "row": 2, "filename": "mikel.png", "title": "Mikel"},
    {"col": 1, "row": 2, "filename": "zureday.png", "title": "Zureday"},
    {"col": 2, "row": 2, "filename": "sweety-stargazer.png", "title": "Sweety Stargazer"},
    {"col": 3, "row": 2, "filename": "woody.png", "title": "Woody"},
]

def crop_and_save(sheet_filename, config_list):
    sheet_path = os.path.join(BASE_DIR, sheet_filename)
    im = Image.open(sheet_path)
    print(f"Loaded {sheet_filename} ({im.size})")

    for item in config_list:
        x1, x2 = COLS[item["col"]]
        y1, y2 = ROW1_Y if item["row"] == 1 else ROW2_Y
        crop_box = (x1, y1, x2, y2)
        cropped = im.crop(crop_box)
        target_path = os.path.join(PRODUCTS_DIR, item["filename"])
        cropped.save(target_path, "PNG", optimize=True)
        print(f"  Cropped {item['title']} -> {target_path} (size: {cropped.size})")

print("=== Cropping custom-bouquet-etc.png ===")
crop_and_save("custom-bouquet-etc.png", CUSTOM_CONFIG)

print("\n=== Cropping bear-bouquet.png ===")
crop_and_save("bear-bouquet.png", BEAR_CONFIG)

# Copy the 3 full sheets
full_sheets = [
    "pricelist-page-image.png",
    "flower-bouquet.png",
    "custom-bouquet.png",
]

print("\n=== Copying Full Sheets to public/images/sheets/ ===")
for sheet in full_sheets:
    src = os.path.join(BASE_DIR, sheet)
    dst = os.path.join(SHEETS_DIR, sheet)
    shutil.copy2(src, dst)
    print(f"  Copied {sheet} -> {dst}")

print("\nPipeline extraction completed successfully!")

