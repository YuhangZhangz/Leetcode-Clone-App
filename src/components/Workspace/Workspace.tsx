"use client"
import {useState} from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import Playground from './Playground/Playground';
import { Problem } from '@/utils/types/problem';
import Confetti from 'react-confetti';
import useWindowSize from '@/hooks/useWindowSize';
type WorkspaceProps = {
  problem: Problem;
};

const Workspace: React.FC<WorkspaceProps> = ({problem}) => {
  const {width, height} = useWindowSize();
  const [success, setSucess] = useState(false)
  const[solved, setSolved] = useState(false)

  return (
    <Split className='split' minSize={0}>
      <ProblemDescription problem={problem} _solved={solved}/>
      <div className="bg-neutral-700">
        <Playground problem={problem} setSucess = {setSucess} setSolved={setSolved}/>
        {success && <Confetti gravity={0.3} tweenDuration={4000} width={width - 1} height={height - 1}/>}
      </div>
    </Split>
  );
};

export default Workspace;