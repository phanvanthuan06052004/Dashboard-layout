import { useState } from "react";
import {
  DndContext, DragOverlay, PointerSensor, useSensor, useSensors,
  closestCorners, useDroppable,
} from "@dnd-kit/core";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Icon from "./Icon";

/* Kanban kéo-thả dùng chung (Marcom leads, CE pipeline).
   columns: [{id,title,dot}]  items: [{id, col, ...}]
   renderCard(item, onOpen): nội dung trong .kcard (role/name/foot). */
function SortableCard({ item, onOpen, renderCard }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style} className={isDragging ? "dragging" : ""}>
      <div className="kcard">
        <div className="kcard__top">
          <span className="kcard__grip" {...listeners} {...attributes}><Icon name="GripVertical" size={16} /></span>
          <div style={{ flex: 1, minWidth: 0 }}>{renderCard(item, onOpen)}</div>
        </div>
      </div>
    </div>
  );
}

function Column({ col, items, onOpen, renderCard }) {
  const { setNodeRef, isOver } = useDroppable({ id: col.id });
  return (
    <div className={`kcol${isOver ? " is-over" : ""}`} ref={setNodeRef}>
      <div className="kcol__head">
        <b><span className="kdot" style={{ background: col.dot }} />{col.title}</b>
        <span className="kcol__count">{items.length}</span>
      </div>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        {items.map((c) => <SortableCard key={c.id} item={c} onOpen={() => onOpen(c)} renderCard={renderCard} />)}
      </SortableContext>
      <button className="btn btn--soft" style={{ width: "100%", justifyContent: "center" }}><Icon name="Plus" size={16} />Thêm</button>
    </div>
  );
}

export default function KanbanBoard({ columns, items: seed, onOpen, renderCard }) {
  const [items, setItems] = useState(seed);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const byCol = (col) => items.filter((i) => i.col === col);
  const findCol = (id) => (columns.some((p) => p.id === id) ? id : items.find((i) => i.id === id)?.col);
  const moveTo = (id, to) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, col: to } : i)));

  const onDragOver = ({ active, over }) => {
    if (!over) return;
    const from = findCol(active.id), to = findCol(over.id);
    if (from && to && from !== to) moveTo(active.id, to);
  };
  const onDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over) return;
    const to = findCol(over.id);
    if (to) moveTo(active.id, to);
  };

  const active = items.find((i) => i.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={({ active }) => setActiveId(active.id)}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="kanban">
        {columns.map((col) => (
          <Column key={col.id} col={col} items={byCol(col.id)} onOpen={onOpen} renderCard={renderCard} />
        ))}
      </div>
      <DragOverlay>
        {active ? (
          <div className="kcard kcard--overlay">
            <div className="kcard__top">
              <span className="kcard__grip"><Icon name="GripVertical" size={16} /></span>
              <div style={{ flex: 1, minWidth: 0 }}>{renderCard(active, () => {})}</div>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
