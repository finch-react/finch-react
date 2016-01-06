import React from 'finch-react';

class Page extends React.Component {
}

class PageHandler extends React.Component {
    const propTypes = {a:1};

    static use(env) {

    }
}

class SuperPageHandler extends PageHandler {


    handle(...params) {

    }
}
const SuperPage = (...props)=><Page {...props} name="SuperPage" handler={<SuperPageHandler/>}/>;

let Pages = (props)=>
    <Page url={props.contextRoot + "/foo/:userId"} handler={()=>null}>
        <Page url="/bar"/>
        <SuperPage url="/super"/>
    </Page>;


class ComponentFactory extends React.Component {
    use(componentDescription) {

    }

    create(componentDescription) {

    }
}