import { createTheme } from '@mui/material';

  export default function Theme(){


  const theme = createTheme({
        palette: {
            primary: {
              main:'#470224',
            
            },

            secondary: {
              main:'#7B1646',
            },

            ternary:{
              main:'#CE622B',
            },

            backgroundColor:{
                main:'#FFFFFF',//white
                dark:'#9B9CAB',//gray middle
                middle:'#D9D9D9',//gray light
                light:'090909',//gray dark
            },

            backgroundGradient:{
              main:'linear-gradient(360deg, #7B1646 30%, #CE622B 90%)',
            }, 


            border:{
                border1:'0.5px solid #CE622B',
                border2:'0.5px solid #FFFFFF',
                border3:'1px solid #FFFFFF',
                border4:'1px solid #470224',
            },

            fontColor:{
              headers:'#FFFFFF',
              content:'#222222',
              display:''
            },

            // fontFamily:{
            //   main:'',
            // }

            fontSize:{
              size1:'small',
            }

          },
        });
        return theme;
      }  
  


