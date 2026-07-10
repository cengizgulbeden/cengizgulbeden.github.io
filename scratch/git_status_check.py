import subprocess

git_path = r"C:\Users\enesy\AppData\Local\GitHubDesktop\app-3.5.6\resources\app\git\cmd\git.exe"
cwd = r"c:\Users\enesy\OneDrive\Desktop\cengizgulbeden.github.io-main"

def run_git(args):
    cmd = [git_path] + args
    result = subprocess.run(cmd, cwd=cwd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    out = result.stdout.decode('utf-8', errors='replace')
    err = result.stderr.decode('utf-8', errors='replace')
    print(f"$ git {' '.join(args)}")
    if out.strip(): print(out)
    if err.strip(): print(err)
    return result.returncode

# Try to fetch and check if remote commits exist
run_git(["fetch", "origin"])
run_git(["status"])
