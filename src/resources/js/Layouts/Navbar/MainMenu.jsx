import React from 'react'
import MenuItem from './MenuItem';

function MainMenu ({ className }) {

    return (
        <div className={className}>
            <MenuItem text="概要" link="overview" icon="overview" />
            <MenuItem text="投票者" link="voters" icon="voters" href={route('admin.voters.index')} />
            <MenuItem text="立候補者" link="candidates" icon="candidates" href={route('admin.candidates.index')} />
            <MenuItem text="結果" link="result" icon="result" />
        </div>
    );
}

export default MainMenu