import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';

import {
  DIFFICULTY_SELECT_TEST_ID,
  SELECT,
  teams
} from 'src/constant';
import { QuizTeamState } from 'src/recoil';
import { Content } from 'components/Molecules';
import Atoms from 'components/Atoms';

const LandingQuizTeam = () => {
  const [quizTeam, setQuizTeam] = useRecoilState(QuizTeamState)
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // setQuizDifficulty(e.target.value);
    console.log(e.target.value);
    setQuizTeam(e.target.value);
  };

  return (
    <Content header="Team">
      <Atoms.Select
        data-testid={DIFFICULTY_SELECT_TEST_ID}
        margin="16px 0px"
        value={quizTeam}
        onChange={handleChange}
      >
        {teams.map((team) => (
          <option
            key={team}
            value={team === SELECT ? undefined : team}
          >
            {team === SELECT 
              ? team.toUpperCase()
              : team
            }
          </option>
        ))}
      </Atoms.Select>
    </Content>
  );
};

export default LandingQuizTeam;
