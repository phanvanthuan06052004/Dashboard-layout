import { useState } from "react";
import {
  DndContext, DragOverlay, PointerSensor, useSensor, useSensors,
  closestCorners, useDroppable,
} from "@dnd-kit/core";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Icon from "../components/Icon";
import { Page } from "../components/ui";
import { useApp } from "../context/AppContext";
import { candidates as seed, pipelineColumns, avatar } from "../data/mockData";

function CardContent({ c, onOpen, listeners, attributes }) {
  return (
    <div className="kcard">
      <div className="kcard__top">
        <span className="kcard__grip" {...listeners} {...attributes}><Icon name="GripVertical" size={16} /></span>
        <div style={{ flex: 1 }}>
          <div className="kcard__role">{c.role}</div>
          <div className="kcard__name" onClick={onOpen}>{c.name}</div>
        </div>
      </div>
      <div className="kcard__foot">
        <img className="avatar" style={{ width: 22, height: 22 }} src={avatar(c.img)} alt="" />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span className="kdot" style={{ background: c.dot }} />{c.since}
        </span>
      </div>
    </div>
  );
}

function SortableCard({ c, onOpen }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: c.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div ref={setNodeRef} style={style} className={isDragging ? "dragging" : ""}>
      <CardContent c={c} onOpen={onOpen} listeners={listeners} attributes={attributes} />
    </div>
  );
}

function Column({ col, items, onOpen }) {
  const { setNodeRef, isOver } = useDroppable({ id: col.id });
  return (
    <div className={`kcol${isOver ? " is-over" : ""}`} ref={setNodeRef}>
      <div className="kcol__head">
        <b><span className="kdot" style={{ background: col.dot }} />{col.title}</b>
        <span className="kcol__count">{items.length}</span>
      </div>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        {items.map((c) => <SortableCard key={c.id} c={c} onOpen={() => onOpen(c)} />)}
      </SortableContext>
      <button className="btn btn--soft" style={{ width: "100%", justifyContent: "center" }}><Icon name="Plus" size={16} />Thêm</button>
    </div>
  );
}

export default function Candidates() {
  const { openDrawer } = useApp();
  const [items, setItems] = useState(() =>
    seed.map((c) => ({ ...c, dot: pipelineColumns.find((p) => p.id === c.col).dot }))
  );
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const byCol = (col) => items.filter((i) => i.col === col);
  const findCol = (id) => {
    if (pipelineColumns.some((p) => p.id === id)) return id;
    return items.find((i) => i.id === id)?.col;
  };

  const onDragOver = ({ active, over }) => {
    if (!over) return;
    const from = findCol(active.id);
    const to = findCol(over.id);
    if (!from || !to || from === to) return;
    setItems((prev) =>
      prev.map((i) => (i.id === active.id ? { ...i, col: to, dot: pipelineColumns.find((p) => p.id === to).dot } : i))
    );
  };

  const onDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over) return;
    const to = findCol(over.id);
    if (to) {
      setItems((prev) =>
        prev.map((i) => (i.id === active.id ? { ...i, col: to, dot: pipelineColumns.find((p) => p.id === to).dot } : i))
      );
    }
  };

  const active = items.find((i) => i.id === activeId);

  return (
    <Page>
      <div className="page-head">
        <div>
          <h2>Candidates</h2>
          <p>Pipeline tuyển dụng · {items.length} ứng viên · kéo-thả để đổi giai đoạn, click tên để xem chi tiết</p>
        </div>
        <div className="head-actions">
          <button className="btn btn--soft"><Icon name="Filter" size={16} />Lọc</button>
          <button className="btn btn--primary"><Icon name="Plus" size={16} />Ứng viên mới</button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={({ active }) => setActiveId(active.id)}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <div className="kanban">
          {pipelineColumns.map((col) => (
            <Column key={col.id} col={col} items={byCol(col.id)} onOpen={(c) => openDrawer("candidate", c)} />
          ))}
        </div>
        <DragOverlay>
          {active ? (
            <div className="kcard kcard--overlay">
              <div className="kcard__top">
                <span className="kcard__grip"><Icon name="GripVertical" size={16} /></span>
                <div style={{ flex: 1 }}>
                  <div className="kcard__role">{active.role}</div>
                  <div className="kcard__name">{active.name}</div>
                </div>
              </div>
              <div className="kcard__foot">
                <img className="avatar" style={{ width: 22, height: 22 }} src={avatar(active.img)} alt="" />
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span className="kdot" style={{ background: active.dot }} />{active.since}
                </span>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </Page>
  );
}
