from PIL import Image

for name in ["assets/profile_first.png", "assets/profile.png", "assets/profile_v2.png", "assets/profile_v3.png", "assets/profile_v4.png"]:
    try:
        img = Image.open(name)
        print(f"{name}: size={img.size}, format={img.format}, mode={img.mode}")
    except Exception as e:
        print(f"Error reading {name}: {e}")
