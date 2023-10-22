import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import {
  DragDropContext,
  Droppable,
  DropResult,
  Draggable,
} from "react-beautiful-dnd";

const inputStyle = {
  // border: '1px solid #ccc'
  borderRadius: "4px",
  padding: "5px",
  margin: "5px",
  outline: "none",
  width: "95%",
};

const contentInputStyle = {
  // border: '1px solid #ccc'
  borderRadius: "4px",
  padding: "5px",
  margin: "5px",
  outline: "none",
  width: "95%",
  overFlow: "hidden",
};

const CreateCuesheetContent = () => {
  const initialData = [
    {
      orderIndex: 1,
      process: "시작",
      actor: "사회자",
      content: "시작합니다",
      filePath: "",
      note: "",
    },
    {
      orderIndex: 2,
      process: "행진",
      actor: "신랑, 신부",
      content: "행진합니다",
      filePath: "",
      note: "",
    },
    {
      orderIndex: 3,
      process: "끝",
      actor: "사회자, 신랑, 신부",
      content: "끝입니다",
      filePath: "",
      note: "",
    },
  ];

  const [dataList, setDataList] = useState(initialData);

  const handleInputChange = (e, index, field) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("name", value);
    const updatedDataList = [...dataList];
    updatedDataList[index][field] = value;
    setDataList(updatedDataList);
  };

  // const handleInputChange = (value, index, field) => {
  //   console.log("value", value);
  //   const updatedDataList = [...dataList];
  //   updatedDataList[index][field] = value;
  //   setDataList(updatedDataList);
  // };

  const onDragEnd = (result) => {
    console.log(result);
    // 드래그가 취소된 경우
    if (!result.destination) return;

    // 리액트 불변성을 지켜주기 위해 새로운 todoData 생성
    const newItems = [...dataList];

    // 1. 변경시키는 아이템을 배열에서 지워줍니다.
    // 2. return 값으로 지워진 아이템을 잡아줍니다.
    const [reorderedItem] = newItems.splice(result.source.index, 1);

    // 원하는 자리에 reorderedItem을 insert 해줍니다.
    newItems.splice(result.destination.index, 0, reorderedItem);

    setDataList(newItems);
  };

  const onAdd = () => {
    console.log("add");
    // setNewData({
    //     ...newData,
    //     orderIndex: newData.orderIndex + 1,
    // })
    // setDataList([...dataList, newData])
  };

  return (
    <Container fluid>
      <Row>
        <Col lg={12}>
          {/* <Card id="orderList"> */}
          <CardHeader className="border-0">
            <Row className="align-items-center gy-3">
              <div className="col-sm">
                <h5
                  className="card-title mb-0"
                  style={{ fontSize: "1.5em", fontWeight: "bold" }}
                >
                  큐시트 생성
                </h5>
              </div>
              <div className="col-sm-auto">
                <div className="d-flex gap-1 flex-wrap">
                  <button
                    type="button"
                    className="btn btn-info"
                    // onClick={onAdd}
                  >
                    <i className="ri-add-line align-bottom me-1"></i> 추가
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-success"
                    // onClick={onAdd}
                  >
                    저장
                  </button>{" "}
                  {/* {isMultiDeleteButton && (
                    <button
                      className="btn btn-soft-danger"
                      onClick={() => setDeleteModalMulti(true)}
                    >
                      <i className="ri-delete-bin-2-line"></i>
                    </button>
                  )} */}
                </div>
              </div>
            </Row>
          </CardHeader>
          <CardBody className="pt-0">
            <div>
              <table className="min-w-full divide-x divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-2 w-1/12 py-3 text-center rtl:text-rightfont-semibold uppercase tracking-wider text-gray-500 dark:text-gray-100 border border-gray-300">
                      식순명
                    </th>
                    <th className="px-2 w-1/12 py-3 text-center border border-gray-300">
                      행위자
                    </th>
                    <th className="px-2 w-5/12 py-3 text-center border border-gray-300">
                      내용
                    </th>
                    <th className="px-2 w-2/12 py-3 text-center border border-gray-300">
                      파일
                    </th>
                    <th className="px-2  w-2/12 py-3 text-center border border-gray-300">
                      비고
                    </th>
                    <th className="px-2  w-1/12 py-3 text-center border border-gray-300">
                      액션
                    </th>
                  </tr>
                </thead>
              </table>

              <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable droppableId="DetailsDroppable">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="DetailsDroppable"
                    >
                      {dataList.map((data, index) => (
                        <Draggable
                          key={data.orderIndex}
                          draggableId={String(data.orderIndex)}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <>
                                <tr key={index}>
                                  {/* 식순명 */}
                                  <td className="border border-gray-200 w-1/12 py-2">
                                    <input
                                      className="focus:border border-gray-300"
                                      type="text"
                                      style={inputStyle}
                                      value={data.process}
                                      onChange={(e) =>
                                        handleInputChange(e, index)
                                      }
                                      // onChange={(e) =>
                                      //   handleInputChange("process", e, index)
                                      // }
                                    />
                                  </td>
                                  {/* 행위자 */}
                                  <td className="border border-gray-200 w-1/12 py-2">
                                    <input
                                      className="focus:border border-gray-300"
                                      type="text"
                                      style={inputStyle}
                                      value={data.actor}
                                      onChange={(e) =>
                                        handleInputChange(e, index)
                                      }
                                      // onChange={(e) =>
                                      //   handleInputChange(
                                      //     "actor",
                                      //     e.target.value,
                                      //     index
                                      //   )
                                      // }
                                    />
                                  </td>
                                  {/* 내용 */}
                                  <td className="border border-gray-200 w-5/12 py-2">
                                    <input
                                      className="focus:border border-gray-300"
                                      type="text"
                                      style={contentInputStyle}
                                      value={data.content}
                                      onChange={(e) =>
                                        handleInputChange(e, index)
                                      }
                                      // onChange={(e) =>
                                      //   handleInputChange(
                                      //     "content",
                                      //     e.target.value,
                                      //     index
                                      //   )
                                      // }
                                    />
                                  </td>
                                  {/* 파일 */}
                                  <td className="border border-gray-200 w-2/12 py-2">
                                    파일
                                  </td>
                                  {/* 비고 */}
                                  <td className="border border-gray-200 w-2/12 py-2">
                                    <input
                                      className="focus:border border-gray-300"
                                      type="text"
                                      style={inputStyle}
                                      value={data.note}
                                      onChange={(e) =>
                                        handleInputChange(e, index)
                                      }
                                      // onChange={(e) =>
                                      //   handleInputChange(
                                      //     "note",
                                      //     e.target.value,
                                      //     index
                                      //   )
                                      // }
                                    />
                                  </td>
                                  <td
                                    className="border border-gray-200 w-1/12 py-2 text-center"
                                    style={{
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <div>
                                      {/* <ActionColumn row={data} /> */}
                                    </div>
                                  </td>
                                </tr>
                              </>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </CardBody>

          {/* </Card> */}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCuesheetContent;
