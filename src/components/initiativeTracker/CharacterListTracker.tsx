import React, { DragEvent, useState } from 'react';
import { List } from 'antd';
import { ITrackerCharacter } from '../../interfaces';

interface TrackerListProps {
  charactersList: ITrackerCharacter[];
}

function CharacterListTracker({ charactersList }: TrackerListProps) {
  const [draggedElement, setDraggedElement] = useState<Element>();

  const startDragHandler = (event: DragEvent) => {
    console.log('startDrag ', event);
    event.dataTransfer.setData('text/plain', event.currentTarget.id);
    event.dataTransfer.effectAllowed = 'move';
    event.currentTarget.classList.add('dragged-element');
    setDraggedElement(event.currentTarget);
  };

  const dragOverHandler = (event: DragEvent) => {
    event.preventDefault();
  };

  const dragEnterHandler = (event: DragEvent) => {
    event.preventDefault();
    event.currentTarget.classList.add('drop-zone');
  };

  const dragLeaveHandler = (event: DragEvent) => {
    event.preventDefault();
    event.currentTarget.classList.remove('drop-zone');
  };

  const dragEndHandler = (event: DragEvent) => {
    event.preventDefault();
    draggedElement?.classList.remove('dragged-element');
  };

  const dropHandler = (event: DragEvent) => {
    console.log('drop completed ', draggedElement?.id);
    console.log('dropped over ', event.currentTarget.id);
    event.preventDefault();
    event.currentTarget.classList.remove('drop-zone');
    draggedElement?.classList.remove('dragged-element');
    const targetCharacter = charactersList.find(({ id }) => id === Number(draggedElement!.id));
    // TODO: implement a way to move target element in the charList array
    // const tmpCharList = [...charactersList];
    console.log(targetCharacter);
  };

  return (
    <List
      dataSource={charactersList}
      renderItem={(item) => (
        <List.Item
          draggable={true}
          onDragStart={startDragHandler}
          onDragOver={dragOverHandler}
          onDragEnd={dragEndHandler}
          onDragEnter={dragEnterHandler}
          onDragLeave={dragLeaveHandler}
          onDrop={dropHandler}
          key={item.id}
          id={item.id.toString()}
        >
          {item.name}
        </List.Item>
      )}
    />
  );
}

export default CharacterListTracker;
