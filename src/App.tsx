import React, { useState } from 'react';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { Button, Container, Form, Navbar } from 'react-bootstrap';
import './style.css';
import type { Activity, Translate } from './types';

function App(): JSX.Element {
  const [showEng, setShowEng] = useState<string>('');
  const [show, setShow] = useState<string>('');

  const [activityTypeEng, setactivityTypeEng] = useState<string>('');
  const [activityType, setactivityType] = useState<string>('');

  const [participantsEng, setParticipantsEng] = useState<string>('');
  const [participants, setParticipants] = useState<string>('');

  const translator = async (
    activity: Activity,
    func: React.Dispatch<React.SetStateAction<string>>,
  ): Promise<void> => {
    const translationResponse = await fetch('https://translate.terraprint.co/translate', {
      method: 'POST',
      body: JSON.stringify({
        q: activity.activity,
        source: 'en',
        target: 'ru',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const translationResult = (await translationResponse.json()) as Translate;
    const data = translationResult.translatedText;
    func(data);
  };

  const showHandler = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    try {
      const res: AxiosResponse<Activity> = await axios.get('https://www.boredapi.com/api/activity/');
      const activity = res.data;
      setShowEng(activity.activity);
      await translator(activity, setShow);
    } catch (err) {
      console.log(err);
    }
  };

  const numberParticipantHandler = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const formElement: HTMLFormElement = event.target as HTMLFormElement;
    const numberData = Object.fromEntries(new FormData(formElement));
    if (typeof +numberData.num === 'number' && +numberData.num > 0 && +numberData.num < 6) {
      try {
        const res: AxiosResponse<Activity> = await axios.get(
          `https://www.boredapi.com/api/activity?participants=${numberData.num as string}`,
        );
        const activity = res.data;
        setParticipantsEng(activity.activity);
        await translator(activity, setParticipants);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const activityTypeHandler = async (e: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    e.preventDefault();
    try {
      const formData = e.target.value;
      const res: AxiosResponse<Activity> = await axios.get(
        `https://www.boredapi.com/api/activity?type=${formData}`,
      );
      const activity = res.data;
      setactivityTypeEng(activity.activity);
      await translator(activity, setactivityType);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navBar">
        <div className='navBarContainer'>
          <Navbar.Brand className="navBarText" href="/">
            <img className="logo" src="/elbrus.svg" alt="" />
            Мне скучно!
          </Navbar.Brand>
          <p className="describer">
            Не знаешь чем заняться? <br />
            Подбирай занятие здесь
          </p>
        </div>
      </nav>
      <div className='mainContainer'><div className="smallContainer">
        <button className="randomBtn" onClick={(e) => void showHandler(e)} type="button">
          Подобрать рандомно
        </button>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingBottom: '5px',
            flexGrow: '2',
          }}
        >
          <div className="activityText">
            {' '}
            <p>* {showEng}</p>
            <br />
            <p>* {show}</p>
          </div>
        </div>
        {!show ? (
          <img className="boredImg" src="/img/girlbored.webp" alt="" />
        ) : (
          <img className="boredImg" src="/img/girlhappy.png" alt="" />
        )}
      </div>
      <div className="smallContainer">
        <div>
          <select
            className="randomBtn formSelect"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => void activityTypeHandler(e)}
          >
            <option className="option" value="random">
              Подобрать категорию
            </option>
            <option className="option" value="education">
              Образование
            </option>
            <option className="option" value="recreational">
              Развлечения
            </option>
            <option className="option" value="social">
              С друзьями
            </option>
            <option className="option" value="diy">
              Своими руками
            </option>
            <option className="option" value="charity">
              Благотворительность
            </option>
            <option className="option" value="cooking">
              Кулинария
            </option>
            <option className="option" value="relaxation">
              Расслабление
            </option>
            <option className="option" value="music">
              Музыка
            </option>
            <option className="option" value="busywork">
              Хлопоты
            </option>
          </select>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingBottom: '5px',
            flexGrow: '2',
          }}
        >
          <div className="activityText" style={{}}>
            {' '}
            <p>* {activityTypeEng}</p>
            <br />
            <p>* {activityType}</p>
          </div>
        </div>
        {!activityType ? (
          <img className="boredImg" src="/img/boycrying.png" alt="" />
        ) : (
          <img className="boredImg" src="/img/boyhappy.png" alt="" />
        )}
      </div>
      <div className="smallContainer">
        <Form className="box" onSubmit={(e) => void numberParticipantHandler(e)}>
          <input
            type="text"
            name="num"
            className="inputNum"
            id="exampleInputPassword1"
            placeholder="введите число от 1 до 5"
          />
          <Button type="submit" className="randomBtn randomBtn2">
            Подобрать по количеству участников
          </Button>
        </Form>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingBottom: '5px',
            flexGrow: '2',
          }}
        >
          <div className="activityText">
            {' '}
            <p>* {participantsEng}</p>
            <br />
            <p>* {participants}</p>
          </div>
        </div>
        {!participants ? (
          <img className="boredImg" src="/img/girlcrying.png" alt="" />
        ) : (
          <img className="boredImg" src="/img/girlhappyface.png" alt="" />
        )}</div>
      
      </div>
    </>
  );
}

export default App;
