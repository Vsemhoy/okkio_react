import React from "react";
import StackComment from "./StackComment";
import './style/stackcomment.css';
import { Avatar, Button, Tooltip } from "antd";

const CommentStack = ({label, children}) => {

    return (
        <div className={'mi-comment-stack'}>
            <div></div>
            <div className={'mi-comment-stack-collection'}>

                <StackComment />
                <StackComment />
                <StackComment />

            </div>
        </div>
    )
}

export default CommentStack;