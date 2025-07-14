import './App.css';
import { useState } from 'react';
function TaskItem({ id, text, done, priority, category, onDelete, onFinish, onEdit, isEditing }) {
  const [isEditTask, setIsEditTask] = useState(isEditing);
  const [editData, setEditData] = useState({
    id, text, done, priority, category,
  })
  function startEdit() {
    setIsEditTask(true);
  }
  function endEdit() {
    setIsEditTask(false);
    onEdit(editData);
  }
  function onInput(e) {
    const transData = { ...editData };
    transData[e.target.name] = e.target.value;
    setEditData(transData);
  }
  return (
    <div className='task-card'>
      <div className={'card-header card-title card-' + category + ' card-' + priority}>
        <span className={done ? 'is-true' : 'is-false'}>{done ? "✔" : "✖"}</span>
        {isEditTask ? <input type="text" name='text' value={editData.text} onChange={e => onInput(e)} /> : text}
      </div>
      <div className='card-content card-body'>
        类别:{isEditTask ? <input type="text" name='category' value={editData.category} onChange={e => onInput(e)} /> : category}
      </div>
      <div className='card-content card-body'>
        级别:{isEditTask ? <input type="text" name='priority' value={editData.priority} onChange={e => onInput(e)} /> : priority}
      </div>
      <div className='card-content card-body'>
        操作:
        {!done && !isEditTask ? <button onClick={startEdit}>编辑</button> : ""}
        {!done && isEditTask ? <button onClick={endEdit}>保存</button> : ""}
        <button onClick={() => onDelete(id)}>删除</button>
        {!done ? <button onClick={() => onFinish(id)}>完成</button> : ""}
      </div>
    </div>
  )
}
function TasksView({ tasksList, onDelete, onFinish, onAddTask, onEdit }) {
  return (
    <ul>
      {
        tasksList.map(task => {
          return (
            <li key={task.id}>
              <TaskItem {...task} onDelete={onDelete} onFinish={onFinish} onAddTask={onAddTask} onEdit={onEdit} isEditing={!task.text} />
            </li>
          )
        })
      }
      <li>
        <div className='task-card'>
          <button onClick={onAddTask}>添加</button>
        </div>
      </li>
    </ul>
  )
}
function App() {
  const [tasksList, setTasksList] = useState([
    {
      "id": 1,
      "text": "学习React基础组件",
      "done": true,
      "priority": "high",
      "category": "学习"
    },
    {
      "id": 2,
      "text": "完成TodoList功能开发",
      "done": false,
      "priority": "urgent",
      "category": "工作"
    },
    {
      "id": 3,
      "text": "给妈妈打电话",
      "done": false,
      "priority": "medium",
      "category": "个人"
    },
    {
      "id": 4,
      "text": "阅读React官方文档",
      "done": false,
      "priority": "high",
      "category": "学习"
    },
    {
      "id": 5,
      "text": "购买下周的食材",
      "done": true,
      "priority": "low",
      "category": "生活"
    },
    {
      "id": 6,
      "text": "修复项目中的Bug",
      "done": false,
      "priority": "urgent",
      "category": "工作"
    },
    {
      "id": 7,
      "text": "健身30分钟",
      "done": false,
      "priority": "medium",
      "category": "健康"
    },
    {
      "id": 8,
      "text": "学习React Hooks高级用法",
      "done": true,
      "priority": "high",
      "category": "学习"
    }
  ])
  function deleteTask(id) {
    const transData = tasksList
    setTasksList(transData.filter(item => item.id !== id));
  }
  function finishTask(id) {
    const transData = [...tasksList]
    setTasksList(transData.map(item => {
      if (item.id === id) {
        if (!item.done) {
          return {
            ...item,
            done: true,
          }
        } else {
          alert("请不要修改已经完成的任务")
        }
      }
      return item;
    }));
  }
  function onAddTask() {
    const newTask = {
      "id": tasksList[tasksList.length - 1].id + 1,
      "text": "",
      "done": false,
      "priority": "",
      "category": ""
    }
    setTasksList([...tasksList,newTask]);
  }
  function onEdit(changeItem) {
    const transData = [...tasksList]
    setTasksList(transData.map(item => {
      if (item.id === changeItem.id) {
        return {
          ...changeItem,
        }
      }
      return item;
    }));
  }

  return (
    <div className="App">
      <h1>TodoList</h1>
      <TasksView tasksList={tasksList} onDelete={deleteTask} onFinish={finishTask} onAddTask={onAddTask} onEdit={onEdit} />
    </div>
  );
}

export default App;
