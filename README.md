# Steps to make it work

## 1. Save credentials in server
INFO: https://git-scm.com/docs/git-credential-store
```
 git config credential.helper store
 git push http://example.com/repo.git
Username: <type your username>
Password: <type your password>

[several days later]
 git push http://example.com/repo.git
[your credentials are used automatically]

```

