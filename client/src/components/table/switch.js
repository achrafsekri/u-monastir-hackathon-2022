import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';
import { useSwitch } from '@mui/base/SwitchUnstyled';
import etudiant from './etudiant_list';
import a from '../../assets/images/a.png';
import Box from '@mui/material/Box';
import axios from 'axios';
const blue = {
  700: '#673ab7',
};

const grey = {
  400: '#BFC7CF',
  800: '#2F3A45',
};

const SwitchRoot = styled('span')`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 36px;
  padding: 8px;
`;

const SwitchInput = styled('input')`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
  cursor: pointer;
`;

const SwitchThumb = styled('span')`
  position: absolute;
  display: block;
  background-color: ${blue[700]};
  width: 30px;
  height: 30px;
  border-radius: 8px;
  top: 3px;
  left: 4px;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    background: url
          center center no-repeat;
  }

  &.focusVisible {
    background-color: #79b;
  }

  &.checked {
    transform: translateX(24px);

    &::before {
        background: url
          center center no-repeat;
    }
  }
`;

const SwitchTrack = styled('span')(
  ({ theme }) => `
  background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[400]};
  border-radius: 4px;
  width: 100%;
  height: 100%;
  display: block;
`,
);

function MUISwitch(props) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    checked,
    disabled,
    focusVisible,
  };



  return (
    <SwitchRoot className={clsx(stateClasses)} >
      <SwitchTrack>
        <SwitchThumb className={clsx(stateClasses)} />
      </SwitchTrack>
      <SwitchInput {...getInputProps()} aria-label="Demo switch" />
      <Box sx={{
          marginTop:'5px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
      <h3>A</h3>
      <h3>P</h3>
      </Box>
    </SwitchRoot>
  );
}

export default function UseSwitchesCustom(props) {
    let cin = props.cin;
    let id = props.id;
    let et={};
    const [che,setche]=React.useState(props.check);
    
    const handelchange=(e)=>{
        setche(!che);
        const send={presence:che,cin:cin,id:id};
        console.log(send);
        
        axios.post("localhost:4000/update_presence", send)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        // etudiant.forEach(element => {
        //     if(element.cin===cin){
        //         element.presence=!element.presence;
        //     }
        // });
        console.log(etudiant);
    }
    
  return <MUISwitch checked={che} onChange={handelchange} />;
}
