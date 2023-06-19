# Kaggle Predict Student Performance from Game Play

## 💡 게임 기반 학습 진행 뒤 게임 로그를 이용해 학생의 교육 성과 예측하기

### DATASET
```
- train.csv
- train_labels.csv
- test.csv
- sample_submission.csv
```
### 예측 대상
* 18개의 질문에 대해 정답 여부(correct) 파악

### 평가 기준
* F1 score: 2 x (Precision x Recall) / (Precision + Recall)
* 효율성 평가: 1 / (Benchmark - maxF1) x F1 + 1 / 32400 x 실행시간


## 🔮 기대효과

* 학생들의 학습 동기부여
    - 지속적인 학습 지도를 위한 기준
    - 성취도 파악 기회 제공하여 학습 동기 부여
    - 단편적으로만 알고 있던 자신의 취약점을 자세하게 알 수 있어 효율적인 집중 가능

* 게임 기반 학습의 효과적인 방법론 개발
    - 학교나 교육 기관에 보다 효과적인 교육 제공 및 학생들이 게임을 통해 학습하는 방식 파악
    - 게임 플레이 데이터를 활용하여 학생들의 성적 및 취약점 예측
    - 학생들의 학업 성취도 개선 시, 이를 바탕으로 게임 기반 학습의 효과적인 방법론 개발

## 📋 데이터 설명

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

## 데이터 분석

* 결측치 데이터 발견
* 특징 간 상관계수 확인

![데과_상관계수](https://github.com/DobiIsFree/gongboohater/assets/52994616/859dc97a-8fa9-499e-ab2d-b4a7bec4ccf9)

<img width="509" alt="상관계수분석1" src="https://github.com/DobiIsFree/gongboohater/assets/52994616/2fa6b8db-f070-4d68-9cb0-51fd31f30ad9">

<img width="497" alt="상관계수분석2" src="https://github.com/DobiIsFree/gongboohater/assets/52994616/b679da69-7658-4f94-a67a-c8c26e3263e4">


```
총 26296946개의 데이터
총 23562명의 사용자
➡️ groupby session_id level_group
    : 총 70686개의 데이터
    : 유의미한 특징 추출
```

### Categorical, Numerical 데이터 처리

```
CATEGORICAL = ['event_name', 'name', 'fqid', 'room_fqid', 'text_fqid']

NUMERICAL = ['page', 'location_x_diff', 'location_y_diff','hover_duration', 'elapsed_time']

OPTIONAL = ['music', 'fullscreen', 'hq']
```

### 특징 추출

```
dataset_df['elapsed_time_diff'] = (
    (dataset_df['elapsed_time'] - dataset_df['elapsed_time'].shift(1))
    .fillna(0)
    .clip(lower=0, upper=1e9)
)

dataset_df['location_x_diff'] = (
    (dataset_df['room_coor_x'] - dataset_df['room_coor_x'].shift(1))
    .abs()
)

dataset_df['location_y_diff'] = (
    (dataset_df['room_coor_y'] - dataset_df['room_coor_y'].shift(1))
    .abs()
)
```

## 🤖 분석 모델: XGBoost

### Parameters
    - General / Booster / Learning Task

**General**

- booster: default=gbtree
- silent: 출력메시지 나타내고 싶지 않으면 1로 설정
- **nthread**: CPU의 실행 스레드 개수 조정

**Tree booster Parameter**

- eta: 학습률, 낮은 값일수록 모델이 견고, 오버피팅 방지에 좋다
0.01 ~ 0.3 정도 설정

- gamma: overfitting 방지에 좋으나 너무 높으면 underfitting
lambda, alpha 값에도 영향을 받기 때문에 동시에 grid search
    - reg_lambda: L2 정규화 (default=1)
    - reg_alpha: L1 정규화 (default=0)

- max_depth: 2^N개의 리프 노드가 생긴다
feature 수에 따라 3~6으로 설정, 오버 피팅이 나지 않을 때까지 늘려

- subsamble: 각 스텝마다 사용할 샘플 비율, 1이하 사용 시 오버피팅 방지(cross-validation 사용 시 굳이..?)

- num_boost_round [0,∞]
몇 회의 step을 반복할지 지정한다. 너무 높은 값을 사용하면 오버피팅, 모델의 사이즈가 커진다

- early_stopping_rounds
개선되지 않으면 num_boost_round에 도달하기 전에 종료한다.

###  Feature Importance
```
from xgboost import plot_importance

fig, ax = plt.subplots(figsize=(15, 12))
plot_importance(xgb, ax=ax)
```

<img width="862" alt="스크린샷 2023-06-19 오후 7 28 05" src="https://github.com/DobiIsFree/gongboohater/assets/52994616/614514e9-497b-4061-b559-99bd5f71561c">