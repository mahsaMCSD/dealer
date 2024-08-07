import React from 'react'
import {
  useLocation,
  useNavigate,
  useParams,
  useOutlet,
  useOutletContext
}            from 'react-router-dom'

export function withLocation (Component) {
  return props => <Component {...props} location={useLocation()}/>
}

export function withNavigate (Component) {
  return props => <Component {...props} navigate={useNavigate()}/>
}

export function withParams (Component) {
  return props => <Component {...props} params={useParams()}/>
}

export function withRouter (Component) {
  return props => <Component {...props} params={useParams()} navigate={useNavigate()} location={useLocation()}/>
}

export function withOutlet (Component) {
  return props => <Component {...props} outlet={useOutlet()} outletContext={useOutletContext()}/>
}
