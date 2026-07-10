import filecmp

img1 = r"assets/profile_first.png"
img2 = r"C:\Users\enesy\.gemini\antigravity\brain\770b5dd5-e0b8-4d8f-a3ab-6c449c0f358f\media__1783592472037.png"
img3 = r"C:\Users\enesy\.gemini\antigravity\brain\770b5dd5-e0b8-4d8f-a3ab-6c449c0f358f\media__1783589787332.png"

try:
    print("profile_first vs media_1783592472037:", filecmp.cmp(img1, img2, shallow=False))
except Exception as e:
    print("Error comparing to 1783592472037:", e)

try:
    print("profile_first vs media_1783589787332:", filecmp.cmp(img1, img3, shallow=False))
except Exception as e:
    print("Error comparing to 1783589787332:", e)
