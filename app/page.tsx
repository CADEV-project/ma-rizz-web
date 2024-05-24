import { Typography } from '@mui/material';

import styles from './page.module.scss';

import { ContentDescription, ContentTitle, Divider, SubTitle, Title } from '@/(client)/components';

import { AutoSlick, FeatureCard, Logo } from '@/(client)/components/home';

import eisenhowerMatrixFeature from '#/images/eisenhowerMatrixFeature.png';
import todoFeature from '#/images/todoFeature.png';

const Page: React.FC = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.bannerSection}>
        <div className={`${styles.bannerCircle} ${styles.bannerCircle1}`} />
        <div className={`${styles.bannerCircle} ${styles.bannerCircle2}`} />
        <div className={`${styles.bannerCircle} ${styles.bannerCircle3}`} />
        <div className={`${styles.bannerCircle} ${styles.bannerCircle4}`} />
        <div className={`${styles.bannerCircle} ${styles.bannerCircle5}`} />
        <div className={`${styles.bannerCircle} ${styles.bannerCircle6}`} />
        <div className={styles.bannerTitlePosition}>
          <div className={styles.bannerTitleContainer}>
            <Typography className={styles.bannerTitle1} variant='h1' textAlign='center'>
              오늘과 같은 하루가 모여서
              <br />
              내일의 내가 된다고 해요
            </Typography>
            <Typography className={styles.bannerTitle2} variant='h1' textAlign='center'>
              더 나은 내가 되기 위해
              <br />
              나에게 집중하도록 도와드릴게요
            </Typography>
            <Typography className={styles.bannerTitle3} variant='h1' textAlign='center'>
              나를 위한
              <br />
              나만의 비서
            </Typography>
            <Typography
              className={styles.bannerTitle4}
              variant='h1'
              fontSize='6rem'
              textAlign='center'>
              MaRizz
            </Typography>
          </div>
        </div>
      </div>
      <div className={styles.introduceSection}>
        <Title>나만의 비서, 마리즈</Title>
        <SubTitle>
          반가워요, 당신을 위한 <span>&apos;현재로선&apos;</span> 일정관리 서비스, 마리즈입니다.
        </SubTitle>
        <div className={styles.introduceContentContainer}>
          <div className={styles.introduceLogo}>
            <Logo />
          </div>
          <div className={styles.introduceContent}>
            <ContentTitle>마리즈(MaRizz)는</ContentTitle>
            <ContentDescription>
              당신을 매력적인 사람으로 만들어 주기 위한 서비스에요.
              <br />
              <br />
              &apos;Ma&apos;는 나를 의미하며, &apos;Rizz&apos;는 매력적인(Charismatic)을 의미해요.
              <br />
              <br />
              앞으로 나를 더 매력적인 사람으로 만들어주기 위해, 나에게 더 집중할 수 있도록 도와주는
              개인비서 역할을 해줄거에요.
            </ContentDescription>
            <Divider />
            <ContentTitle>&apos;현재로선&apos; 이라고 한 이유는</ContentTitle>
            <ContentDescription>
              마리즈는 제가 불편했던 점을 개선해 나가기 위해서 만든 서비스 이기 때문이에요.
              <br />
              <br />
              전 MBTI의 J와 P중 P(Perception)에 속하는 사람이에요. 계획을 세우는걸 별로 좋아하지
              않고, 상황에 따라 유연하게 대처하는것을 좋아하죠. 개발자인 저에겐 좋은 성격이에요.
              문제가 해결될때까지 다른일은 제쳐두죠. 그게 비록 식사일지라도요.
              <br />
              <br />
              문제는, 취업을 하고 회사에 다니기 시작하면서 회사일을 진행하는데 있어서 계획적이지
              못한 성격은 시간을 꽤 낭비했다는거에요. 더 큰 문제는, 회사일에서 시간을 효율적으로
              쓰지 못하다보니 나에게 집중하는 시간이 부족해졌어요.
              <br />
              <br />
              그렇지만 제 성향은 쉽게 바꿀 수 없었어요. 게다가 전 남들처럼 세세하게 계획을
              세우는것에서 스트레스를 받는 성격이고요.
              <br />
              <br />
              그래서 전 일정관리를 더 쉽고 더 편하게 할 수 있는 방법들을 찾아봤고 결국 더 편하게
              제가 직접 만들어 보기로 했습니다.
              <br />
              <br />
              이것 이외에도 불편했던 점들은 많았고, 앞으로 그것들을 개선해서 이 서비스에 넣을
              예정이에요.
            </ContentDescription>
          </div>
        </div>
      </div>
      <div className={styles.featureSection}>
        <Title>일정관리를 위한, 간단하지만 강력한</Title>
        <SubTitle>
          <span>TODO</span>와 <span>아이젠하워 매트릭스</span>
        </SubTitle>
        <div className={styles.featureContentContainer}>
          <FeatureCard
            image={todoFeature}
            titleChildren={
              <Typography variant='h3' fontWeight='700' textAlign='center'>
                TODO 리스트
              </Typography>
            }
            descriptionChildren={
              <Typography variant='h5'>
                간단하지만 강력한 목표 정하기 방식이에요.
                <br />
                해야 할 일들이 생각날때, 바로 적어두는거에요.
                <br />
                <br />
                목표를 설정하고 나면, 그 목표를 달성하기 위한 계획을 세울 수 있어요.
              </Typography>
            }
          />
          <FeatureCard
            image={eisenhowerMatrixFeature}
            titleChildren={
              <Typography variant='h3' fontWeight='700' textAlign='center'>
                아이젠하워 매트릭스
              </Typography>
            }
            descriptionChildren={
              <Typography variant='h5'>
                아이젠하워 박스라고도 불리는 우선순위 설정에 좋은 방식이에요.
                <br />
                <br />
                TODO 리스트에 정의한 할 일들을 세분화 하는 과정입니다.
                <br />
                중요도와 긴급도를 기준으로 일을 4가지로 분류하고, 그에 따라 우선순위를 정할 수
                있어요.
              </Typography>
            }
          />
        </div>
      </div>
      <div className={styles.planSection}>
        <Title>여기서 멈추지 않아요</Title>
        <SubTitle>
          불편했던것들이 많아요. 그것들을 개선해서 더 나은 마리즈를 만들어 나갈거에요.
        </SubTitle>
        <div className={styles.planContentContainer}>
          <div className={styles.planContent}>
            <ContentTitle>나의 현재를 완벽하게 챙겨주는 개인비서로서</ContentTitle>
            <ContentDescription>앞으로 모든 일정관리는 마리즈에 맡겨주세요.</ContentDescription>
            <AutoSlick
              slickItems={[
                {
                  title: '자체 캘린더',
                  description: '자체 캘린더 기능을 추가할 예정이에요.',
                  image: '',
                },
                {
                  title: '구글 캘린더 연동',
                  description: '구글 캘린더와 연동해 더 편하게 사용할 수 있어요.',
                  image: '',
                },
                {
                  title: '알림 기능',
                  description: '일정관리의 알림을 위한 기능이 추가될 예정입니다.',
                  image: '',
                },
                {
                  title: '앱 버전 출시',
                  description: '앱이 있다면, 언제 어디서나 편하게 확인 가능하겠죠?',
                  image: '',
                },
                {
                  title: '기타 일정관리 방식',
                  description:
                    'TODO, 아이젠하워 매트릭스를 제외한 다른 방식의 일정관리 툴도 제공될 예정입니다.',
                  image: '',
                },
                {
                  title: 'AI 비서',
                  description:
                    '마리즈와의 대화만으로 모든 일정을 관리해주면 얼마나 편할까요? 기대해주세요!',
                  image: '',
                },
                { title: '+', description: '더 추가될 예정입니다.', image: '' },
              ]}
            />
          </div>
          <div className={styles.planContent}>
            <ContentTitle>나를 더 발전시키기 위해서 보조해주는</ContentTitle>
            <ContentDescription>
              이런 분야에서 당신의 능력을 키우는 것을 보조해주고자 해요.
            </ContentDescription>
            <AutoSlick
              slickItems={[
                {
                  title: '습관관리 방정식',
                  description:
                    '도파민 중독인 요즘 세대에서, 진정한 나를 찾기 위한 도움이 필요하지 않을까요?',
                  image: '',
                },
                {
                  title: '통찰력 강화',
                  description:
                    '뉴스, 혹은 정량적인 데이터를 본인의 판단한 것과 함께 입력하여 통찰력을 키우는데 도움을 줍니다.',
                  image: '',
                },
                {
                  title: '나를 위한 회고',
                  description: '더 나은 내가 되기 위한 회고를 진행할 수 있도록',
                  image: '',
                },
                { title: '+', description: '더 추가될 예정입니다.', image: '' },
              ]}
              slidesToScroll={-1}
            />
          </div>
        </div>
      </div>
      <div className={styles.notificationSection}>
        <Title>마리즈가 마음에 드셨다면</Title>
        <SubTitle>준비가 되었을 때 알려드리려고 해요.</SubTitle>
      </div>
      <div className={styles.inquirySection}>
        <Title>혹시, 좋은 아이디어가 있으신가요?</Title>
        <SubTitle>여러분이 낸 아이디어와 함께 성장해 나가려해요.</SubTitle>
      </div>
    </div>
  );
};

export default Page;
