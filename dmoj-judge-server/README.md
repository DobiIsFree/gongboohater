# dmoj-judge-server

**DMOJ site official docs**: https://docs.dmoj.ca/#/judge/setting_up_a_judge?id=setting-up-a-judge

## Setting up a Judge

1. dmoj site (http://localhost:8000)에 접속한다.

2. admin 계정으로 로그인한다. 임의로 만들지 않은 경우 아래 정보로 접속 가능
```
ID = admin
PW = admin
```

## Site-side setup
```
$ sudo apt update
$ sudo apt install supervisor
$ sudo supervisorctl status
```

## Judge-side setup

- dmoj에 업로드할 problems를 위해 디렉토리 생성
```
$ cd /dmoj
$ mkdir problems
```

- judge 폴더에 server repository fork

계속 error..
```
bridged RUNNING pid <pid>, uptime <uptime>
```
