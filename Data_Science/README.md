### kaggle

# Predict Student Performance from Game Play

## train.csv

### features
- session_id: 이벤트가 발생한 세션 id, 사용자 id
    
    23562 명의 user 존재
- index: 각 세션 ID 마다 발생한 이벤트의 순서
- elapsed_time: 세션의 시작 ~ 이벤트가 기록된 시간
- event_name
```
navigate_click        11326433
person_click           6052853
cutscene_click         2703035
object_click           2198211
object_hover           1057085
map_hover               945159
notification_click      649001
notebook_click          564544
map_click               517242
observation_click       212355
checkpoint               71028
```
- name: 이벤트 이름
```
undefined    12705785
basic        12648469
close          676696
open           235139
prev            19250
next            11607
```
- level: 이벤트 발생한 게임 레벨 (0~22)
- page: notebook_click event page 번호
- room_coor_x, y: click event 게임 창의 x, y 좌표
- screen_coor_x, y: click event 플레이어 화면의 x, y좌표
- hover_duration: object_hover 이벤트가 발생한 시간
- text: event 중 이용자가 보는 텍스트
- fqid: event의 정규화된 id
- room_fqid: event 발생한 room의 정규화된 id(closet, front desk)
- text_fqid: event 중 이용자가 보는 텍스트의 정규화된 id(room_fqid + text) 
- fullscreen: 전체화면 여부
```
0    22694166
1     3602780
```
- hq: 고품질 화면 여부
```
0    23135929
1     3161017
```
- music: 게임 음악 유무
```
1    24439799
0     1857147
```
- level_group: 0~4, 5~12, 13~22
```
13-22    13471703
5-12      8844238
0-4       3981005
```

CATEGORY = ['event_name', 'name', 'text', 'fqid', 'room_fqid', 'text_fqid', 'level_group']
NUMERICAL = ['elapsed_time', 'room_coor_x', 'room_coor_y', 'screen_coor_x', 'screen_coor_y', 'hover_duration', 'index', 'level', 'fullscreen', 'hq', 'music']

## train_labels.csv

session_id, corret, session, q


