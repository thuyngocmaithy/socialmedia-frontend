import React from "react";
import  { useEffect,useState } from 'react';
import useDrivePicker from 'react-google-drive-picker';

const GoogleDrivePicker = ({show}) => {
    const [openPicker, authResponse] = useDrivePicker();  
    const handleOpenPicker = () => {
      openPicker({
        clientId: "732891886564-ic0bg0efo5voj0fsvq4ivsgp94b7fd99.apps.googleusercontent.com",
        developerKey: "AIzaSyC-WXjZ9xYVhAJsvKUr5mbEDdIe4Uru9zw",
        viewId: "DOCS",
        token: "ya29.a0AfB_byCUJoC1H6Q6rIAs0HTkXHGcj_LOY6cxiz9HCuzD0h53eQyR2RyIADNNmNd6M7Ewa4j_INwAuWN99V0vUJEDG-ytEWx4g1PnQJDcM-f0_RusBWuuGTx76twe1OP6kCo39DNjMdWpVBeTQAsxtw3TKUNGWokPChcKaCgYKAW0SARASFQGOcNnCq-Jpths3415tPRldNiBonA0171",
        // token: token, // pass oauth token in case you already have one
        showUploadView: true,
        showUploadFolders: true,
        supportDrives: true,
        multiselect: true,
        // customViews: customViewsArray, // custom view
        callbackFunction: (data) => {
          if (data.action === 'cancel') {
            console.log('User clicked cancel/close button')
          }
          console.log(data);
        },
      })
    }
    
    // handleOpenPicker();
    if(show) handleOpenPicker();

    return (
        <div>
            <button>ddd</button>
        </div>
    );
};

export default GoogleDrivePicker;