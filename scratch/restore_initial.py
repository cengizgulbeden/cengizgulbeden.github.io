import subprocess

git_path = r"C:\Users\enesy\AppData\Local\GitHubDesktop\app-3.5.6\resources\app\git\cmd\git.exe"
cwd = r"c:\Users\enesy\OneDrive\Desktop\cengizgulbeden.github.io-main"

# Get the binary content of the profile.png from the very first commit (82b0065)
result = subprocess.run([git_path, "show", "82b0065:assets/profile.png"], cwd=cwd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

if result.returncode == 0:
    with open("assets/profile_first.png", "wb") as f:
        f.write(result.stdout)
    print("Success: original logo saved as assets/profile_first.png")
else:
    print("Error:", result.stderr.decode('utf-8', errors='replace'))
