import shutil, os, subprocess

git_path = r"C:\Users\enesy\AppData\Local\GitHubDesktop\app-3.5.6\resources\app\git\cmd\git.exe"
cwd = r"c:\Users\enesy\OneDrive\Desktop\cengizgulbeden.github.io-main"

# Copy original logo to profile_v5.png and profile.png
shutil.copy2("assets/profile_first.png", "assets/profile_v5.png")
shutil.copy2("assets/profile_first.png", "assets/profile.png")
print("Original logo copied.")

# Read index.html
index_path = "index.html"
with open(index_path, "r", encoding="utf-8") as f:
    html = f.read()

# Replace profile_v4.png with profile_v5.png
html_updated = html.replace("assets/profile_v4.png", "assets/profile_v5.png")

with open(index_path, "w", encoding="utf-8") as f:
    f.write(html_updated)
print("index.html updated to target profile_v5.png")

# Git commit and push
def run_git(args):
    cmd = [git_path] + args
    result = subprocess.run(cmd, cwd=cwd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    out = result.stdout.decode('utf-8', errors='replace')
    err = result.stderr.decode('utf-8', errors='replace')
    print(f"$ git {' '.join(args)}")
    if out.strip(): print(out)
    if err.strip(): print(err)
    return result.returncode

run_git(["remote", "set-url", "origin", "https://emreymz3866-gif@github.com/cengizgulbeden/cengizgulbeden.github.io.git"])
run_git(["add", "index.html", "assets/profile.png", "assets/profile_v5.png"])
run_git(["commit", "-m", "Restore logo to original state with handwriting"])
code = run_git(["push", "--force", "-u", "origin", "main"])
print(f"Push result: {code}")
