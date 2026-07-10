import subprocess

git_path = r"C:\Users\enesy\AppData\Local\GitHubDesktop\app-3.5.6\resources\app\git\cmd\git.exe"
cwd = r"c:\Users\enesy\OneDrive\Desktop\cengizgulbeden.github.io-main"

def run_git(args):
    cmd = [git_path] + args
    result = subprocess.run(cmd, cwd=cwd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    print(f"$ git {' '.join(args)}")
    out = result.stdout.decode('utf-8', errors='replace')
    err = result.stderr.decode('utf-8', errors='replace')
    if out.strip(): print(out)
    if err.strip(): print(err)
    return out

# List commits
commits_out = run_git(["log", "--oneline", "--reverse"])
first_commit = commits_out.splitlines()[0].split()[0]
print(f"First commit: {first_commit}")

# Get file list in first commit
run_git(["show", f"{first_commit}:assets/profile.png"])
