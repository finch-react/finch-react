import React, {Component} from 'finch-react';

const styles = (theme)=>({
    "main:active": {},
    "foo:active": {
        borderColor: theme("mainColor")
    }
});

export default class Foo extends Component {
    static defaultProps = {
        styles: styles,
        active: true
    };

    render() {
        return (
            <div>
                <div element="foo"></div>
            </div>
        );
    }
}