import Topbar from '@/components/Topbar/Topbar';
import React from 'react';
import Workspace from '@/components/Workspace/Workspace';
type ProblemPage= {
    
};

const ProblemPage:React.FC<ProblemPage> = () => {

    return <div>
        <Topbar problemPage/>
        <Workspace />
    </div>
}
export default ProblemPage;