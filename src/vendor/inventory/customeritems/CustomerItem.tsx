

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Switch from '@mui/material/Switch';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import "./CustomerItem.css";
import { useState } from 'react';


const CustomerItem=()=>{

    const label = { inputProps: { 'aria-label': 'Switch demo' } };   

    const [val, setVal] = useState(0);

    const handlebox = (event: React.SyntheticEvent, newValue: number) => {
      setVal(newValue);
    };

    return(
        <div> 
            <div>
            <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" className='nav-head'>
            <Toolbar>
               <IconButton
               size="large"
               edge="start"
               aria-label="menu"
               sx={{ mr: 2 }}
               >
               <ArrowBackIcon/>
               </IconButton>
               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                shop name
               </Typography>
               <Switch {...label} />
               <Button color="inherit">Veg Only</Button>
            </Toolbar>
            </AppBar>
            </Box>
            </div>         

            <div className='search-div'>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,marginLeft:50 }}
              >
              <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Item .."
              inputProps={{ 'aria-label': 'search google maps' }}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
              </IconButton>
            
              <FilterListIcon/>
            </Paper>            
                     
            </div>

            <div className='vendor-category-div'>
            <Box sx={{ maxWidth: { xs: 350, sm: 1800 }, bgcolor: 'background.paper' }}>
            <Tabs
              value={val}
              onChange={handlebox}
              variant="scrollable"
              scrollButtons={false}
              aria-label="scrollable prevent tabs example"
              >
            <Tab label="Category One" />
            <Tab label="Category Two" />
            <Tab label="Category Three" />
            <Tab label="Category Four" />
            <Tab label="Category Five" />
            <Tab label="Category Six" />
            <Tab label="Category Seven" />
            
            </Tabs>
            </Box>
            
            </div>

            <div>
                items
            </div>        

        </div>
    )

}

export default CustomerItem;