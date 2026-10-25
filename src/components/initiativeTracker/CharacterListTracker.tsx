import { DragEvent, useState } from 'react';
import { List, InputNumber, Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { ITrackerCharacter } from '../../interfaces';
import { moveElementInArray } from '../../tools/snippets';

interface TrackerListProps {
  charactersList: ITrackerCharacter[];
  onArrange: (arrangedList: ITrackerCharacter[]) => void;
}

function CharacterListTracker({ charactersList, onArrange }: TrackerListProps) {
  const [draggedElement, setDraggedElement] = useState<Element>();
  const lastListItemId = 'listLastItem';

  const startDragHandler = (event: DragEvent) => {
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
    const dropZoneId = event.currentTarget.id;
    const lastArrayItem = charactersList[charactersList.length - 1];
    event.preventDefault();
    event.currentTarget.classList.remove('drop-zone');
    draggedElement?.classList.remove('dragged-element');
    if (
      draggedElement?.id !== dropZoneId &&
      !(dropZoneId === lastListItemId && Number(draggedElement?.id) === lastArrayItem.id)
    ) {
      const targetCharacter = charactersList.find(({ id }) => id === Number(draggedElement!.id));
      const anchorCharacter =
        dropZoneId === lastListItemId
          ? charactersList[charactersList.length - 1]
          : charactersList.find(({ id }) => id === Number(dropZoneId));
      const arrangedArray = moveElementInArray(
        charactersList,
        targetCharacter,
        anchorCharacter,
        dropZoneId === lastListItemId
      );
      onArrange(arrangedArray);
    }
  };

  const initiativeHandler = (event: [id: number, initiative: number]) => {
    const [id, initiative] = event;
    const updatedList = [...charactersList];
    updatedList.forEach((item) => {
      if (item.id === id) {
        item.initiative = initiative;
      }
    });
    onArrange(charactersList);
  };

  const removeCharacterHandler = (charId: number) => {
    const updatedList = charactersList.filter((character) => character.id !== charId);
    onArrange(updatedList);
  };

  const sortListHandler = () => {
    const updatedList = charactersList
      .sort((a: ITrackerCharacter, b: ITrackerCharacter) => a.initiative - b.initiative)
      .reverse();
    onArrange(updatedList);
  };

  const nextTurnHandler = () => {
    const updatedList = [...charactersList];
    const moveToLast = charactersList[0];
    updatedList.shift();
    updatedList.push(moveToLast);
    onArrange(updatedList);
  };

  return (
    <>
      {charactersList.length > 1 ? (
        <div>
          <Button onClick={sortListHandler}>Sort by initiative</Button>
          <Button onClick={nextTurnHandler} style={{ float: 'right' }}>
            Next turn
          </Button>
        </div>
      ) : null}
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
            className="draggable"
            actions={[
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteFilled />}
                onClick={() => removeCharacterHandler(item.id)}
              />
            ]}
          >
            <List.Item.Meta
              title={item.name}
              avatar={
                <div className="initiative-field">
                  <InputNumber
                    value={item.initiative}
                    onChange={(value) => initiativeHandler([item.id, value ?? 0])}
                    min={-99}
                    max={99}
                    style={{
                      width: '4em'
                    }}
                  />
                  <span className="initiative-field__label">Initiative</span>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <div
        id={lastListItemId}
        onDragOver={dragOverHandler}
        onDragEnter={dragEnterHandler}
        onDragEnd={dragEndHandler}
        onDragLeave={dragLeaveHandler}
        onDrop={dropHandler}
        style={{
          height: '1em'
        }}
      ></div>
    </>
  );
}

export default CharacterListTracker;
