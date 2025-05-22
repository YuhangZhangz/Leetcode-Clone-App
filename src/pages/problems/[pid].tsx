import Topbar from '@/components/Topbar/Topbar';
import React from 'react';
import Workspace from '@/components/Workspace/Workspace';
import {problems} from '@/utils/problems';
import { Problem } from '@/utils/types/problem';
import useHasMounted from '@/hooks/useHasMounted';
type ProblemPageProps= {
   problem: Problem  
};

const ProblemPage:React.FC<ProblemPageProps> = ({problem}) => {
    const hasMounted = useHasMounted();
  
  if(!hasMounted) return null;
    return <div>
        <Topbar problemPage/>
        <Workspace problem={problem}/>
    </div>
}
export default ProblemPage;

// fetch the local data
// SSG
// getstaticPaths => it creates the paths for the dynamic pages
export async function getStaticPaths() {
    const paths = Object.keys(problems).map((key) => {
        return {
            params: {
                pid: key,
            },
        };
    });
    return { paths, fallback: false };
}

// getstaticProps => it fetches the data for the page   
export async function getStaticProps({ params }: { params: { pid: string } }) {
    const {pid} = params;
    const problem = problems[pid];

    if (!problem) {
        return {
            notFound: true,
        };
    }
    problem.handlerFunction = (problem.handlerFunction as Function).toString();
    return {
        props: {
            problem,
        },
    };
}