import React from 'react';
import { Route, Navigate } from 'react-router';

const DefaultRoute = ({defaultPath}: {defaultPath: string}) => <Route path='/' element={<Navigate to={defaultPath} />}/>;


export default DefaultRoute;