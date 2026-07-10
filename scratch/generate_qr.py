import qrcode
import os

def generate_qr():
    # URL to encode
    url = "https://cengizgulbeden.github.io"
    
    # Create qrcode object
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=15, # Larger box size for higher resolution
        border=4,
    )
    
    # Add data
    qr.add_data(url)
    qr.make(fit=True)
    
    # Create an image from the QR Code instance
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Convert to standard RGB mode for 100% compatibility with all image viewers
    img_rgb = img.convert("RGB")
    
    # Save paths
    assets_path = r"c:\Users\enesy\OneDrive\Desktop\cengizgulbeden.github.io-main\assets\qr_code.png"
    desktop_path = r"c:\Users\enesy\OneDrive\Desktop\qr_code.png"
    
    # Save to assets
    img_rgb.save(assets_path)
    print(f"Saved RGB QR code to assets: {assets_path}")
    
    # Save to Desktop for user convenience
    img_rgb.save(desktop_path)
    print(f"Saved RGB QR code to Desktop: {desktop_path}")

if __name__ == "__main__":
    generate_qr()
