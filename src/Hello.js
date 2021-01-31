import React from 'react';

function Hello({color , name , isSpecial}) {
    return ( 
        <div style ={{
            color
        }}>
            <b>{isSpecial ? '특별한' : '특별하지 않은'}</b>
            안녕하세요{name}
        </div>
    );
}

Hello.defaultProps = {
    name: '이름없음'
}
export default Hello;