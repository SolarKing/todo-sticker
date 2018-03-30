// @flow
import React from 'react';
import { List, Icon } from 'antd';
import type { EventState } from '../../states';
import './todoList.scss';
import moment from 'moment';
import EditModal from '../eventEditModal/eventEditModal';
import Translate from '../../class/translate';

type Props = {
    todoLists: EventState[]
}

type States = {
    visibleModal: boolean,
    selectedId: number,
    selectedNotificationDate: ?number,
    selectedNotificationTime: ?number,
    selectedDescription: string,
}

export default class TodoList extends React.Component<Props, States> {

    handleEditTodo: Function;

    state = {
        visibleModal: false,
        selectedId: 0,
        selectedNotificationDate: null,
        selectedNotificationTime: null,
        selectedDescription: '',
    }

    constructor(props: Props) {
        super(props);
        this.handleEditTodo = this.handleEditTodo.bind(this);
    }

    handleEditTodo(todo: EventState) {
        this.setState({
            visibleModal: true,
            selectedId: todo.id,
            selectedDescription: todo.description,
            selectedNotificationDate: todo.notificationDate,
            selectedNotificationTime: todo.notificationTime,
        });
    }

    render() {
        return (
            <div>
                <List
                    dataSource={this.props.todoLists}
                    renderItem={
                        (item: EventState) => (
                            <List.Item actions={[<a onClick={() => this.handleEditTodo(item)} >edit</a>, <a>more</a>]} >
                                <div className="list-row"  >
                                    <div className="clock">
                                        <Icon type="clock-circle-o" />
                                    </div>
                                    <div className="notification-time">
                                        {moment(item.notificationDate).format('YYYY/MM/DD')} - {moment(item.notificationTime).format('HH:mm')}
                                    </div>
                                    <div className="description">
                                        {item.description}
                                    </div>
                                </div>
                            </List.Item>
                        )
                    }
                />
                <EditModal
                    title={Translate.tr('Edit Todo')}
                    visible={this.state.visibleModal}
                    onCancel={() => this.setState({visibleModal: false})}
                    defaultDate={this.state.selectedNotificationDate || new Date().getTime()}
                    defaultTime={this.state.selectedNotificationTime || new Date().getTime()}
                    defaultDescriptin={this.state.selectedDescription}
                />
            </div>
        );
    }

}