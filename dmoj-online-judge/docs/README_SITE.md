# Settings Site

**DMOJ site official docs**: https://docs.dmoj.ca/#/site/installation

## Docker

```
docker pull ubuntu:20.04

docker run --name oj_server -p 80:22 -dit ubuntu:20.04

docker attach oj_server
```



## Installing the prerequisites

- 각종 패키치 최신 업데이트 및 설치

```
$ sudo apt update
$ sudo apt install git gcc g++ make python3-dev python3-pip libxml2-dev libxslt1-dev zlib1g-dev gettext curl redis-server
$ sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
$ sudo apt install nodejs
$ sudo npm install -g sass postcss-cli postcss autoprefixer // added
$ sudo apt install python3.8-venv // added
```




## Creating the database
- 최신 버전의 mariadb-server와 libmysqlclient-dev 패키지 설치
```
$ sudo apt update
$ sudo apt install mariadb-server libmysqlclient-dev
```
- Database 생성하기
```
$ sudo mysql -uroot -p
Enter password: <ubuntu 비밀번호>
mariadb> CREATE DATABASE dmoj DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci;
mariadb> GRANT ALL PRIVILEGES ON dmoj.* to 'dmoj'@'localhost' IDENTIFIED BY '<DB-비밀번호>';
mariadb> exit
```

## Installing prerequisites

- Mydmoj 디렉토리 생성 및 이동
```
$ mkdir Mydmoj
$ cd Mydmoj
```

- 가상환경 구축 및 실행

```
$ python3 -m venv dmojsite
$ . ~/Mydmoj/dmojsite/bin/activate
```

- dmoj 저장소 site 폴더 안에 저장
```
$ git clone https://github.com/DMOJ/site.git
$ cd site
$ git checkout v4.0.0  # only if planning to install a judge from PyPI, otherwise skip this step
$ git submodule init
$ git submodule update
```

- python3 관련 패키지 모두 설치
```
(dmojsite) $ sudo pip install --upgrade jinja2
(dmojsite) $ sudo pip install --upgrade cryptography
(dmojsite) $ sudo pip3 install -r requirements.txt
(dmojsite) $ sudo pip3 install mysqlclient
```

- local_settings.py 수정
    - 할당받은 외부IP 이용시 ALLOWED_HOSTS 수정

        ```
        ALLOWED_HOSTS = ['<IP-Address>']
        ```

    - CELERY_BROKER_URL, CELERY_RESULT_BACKEND 주석 해제

        ```
        CELERY_BROKER_URL = 'redis://localhost:6379'
        CELERY_RESULT_BACKEND = 'redis://localhost:6379'
        ```

    - DATABASE 내 PASSWORD 항목 수정

        ```
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.mysql',
                'NAME': 'dmoj',
                'USER': 'dmoj',
                'PASSWORD': '<DB-비밀번호>',
                'HOST': '127.0.0.1',
                'OPTIONS': {
                    'charset': 'utf8mb4',
                    'sql_mode': 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION',
                },
        ```

    - 로그파일 절대경로 설정

        ```
        'handlers': {
            # You may use this handler as example for logging to other files..
            'bridge': {
                ...
                'filename': '/.../logfile.txt',
                ...
            },
        ```

- manage.py 실행

```
(dmojsite) ~/Mydmoj/site$ sudo python3 manage.py check
System check identified no issues (47 silenced).
```

## Compiling assets
- 스타일 시트 생성

```
(dmojsite) $ ./make_style.sh
```

- 정적 파일 수집
```
(dmojsite) $ python3 manage.py collectstatic
```
- 국가별 언어 관련 파일 생성
```
(dmojsite) $ python3 manage.py compilemessages
(dmojsite) $ python3 manage.py compilejsi18n
```

## Setting up Database tables
- 데이터베이스 schema 생성
```
(dmojsite) $ python3 manage.py migrate
```

- 초기 데이터 로드
```
(dmojsite) $ python3 manage.py loaddata navbar
(dmojsite) $ python3 manage.py loaddata language_small
(dmojsite) $ python3 manage.py loaddata demo
```

- admin 계정 만들기
```
(dmojsite) $ python3 manage.py createsuperuser
```

## Setting up Celery
- 가상환경 해제
```
(dmojsite) $ deactivate
$ cd ~
```

- Celery workers 인증
```
$ service redis-server start
```

## Running the server
1. 웹 서버를 열기 위핸 새 SSH 연결 세션을 만든다. (세션 #1)
```
. venv/bin/activate
sudo python3 /online-judge/site/manage.py runserver 0.0.0.0:8000 (세션 #2)
```

2. bridged 실행을 테스트하기 위한 새 SSH 연결 세션을 만든다.
```
sudo python3 /online-judge/site/manage.py runbridged
```

3. Celery workers가 실행되는지 테스트한다. (동작되는 것이 확인되면 ctrl-c로 빠져나온다.)
```
sudo pip3 install redis
celery -A /online-judge/site/dmoj_celery worker
```

4. 모든 테스트가 완료 된 후, 세션 #1, 세션 #2 로 서버를 띄우고 http://localhost:8000 (http://<외부IP>:8001) 에 접속되는지 확인한다.



## Essential

### Setting up uWSGI
original: https://docs.dmoj.ca/#/site/installation?id=setting-up-uwsgi

### Setting up supervisord
original: https://docs.dmoj.ca/#/site/installation?id=setting-up-supervisord

### Setting up nginx
original: https://docs.dmoj.ca/#/site/installation?id=setting-up-nginx

### Configuration of event server
original: https://docs.dmoj.ca/#/site/installation?id=configuration-of-event-server
