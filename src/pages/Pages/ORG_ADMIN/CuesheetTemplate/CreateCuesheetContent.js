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
      process: "",
      actor: "",
      content: "",
      filePath: "",
      note: "",
    },
  ];

  const [dataList, setDataList] = useState(initialData);

  const [newData, setNewData] = useState({
    ...initialData,
    orderIndex: 2,
  });

  const [fileInputs, setFileInputs] = useState([]);

  const handleInputChange = (field, value, index) => {
    const updatedDataList = [...dataList];
    updatedDataList[index][field] = value;
    setDataList(updatedDataList);
  };

  const handleFileChange = (e, index) => {
    const updatedDataList = [...dataList];
    const files = e.target.files;

    const updatedFileInputs = [...fileInputs];

    for (let i = 0; i < e.target.files.length; i++) {
      updatedFileInputs[index + i] = e.target.files[i];
    }

    setFileInputs(updatedFileInputs);
    if (files.length > 0) {
      updatedDataList[index] = {
        ...updatedDataList[index],
        filePath: files[0].name,
      };
      setDataList(updatedDataList);
    }
  };

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
    setNewData({
      ...newData,
      orderIndex: newData.orderIndex + 1,
    });
    setDataList([...dataList, newData]);
  };

  // useEffect를 사용하여 dataList 상태가 업데이트될 때 리렌더링을 트리거
  useEffect(() => {
    // dataList이 변경될 때 실행되는 코드
  }, [dataList]);

  const ActionColumn = (row) => {
    console.log("삭제");
    // const { textTheme } = useThemeClass();

    const onDelete = () => {
      //삭제할 데이터 찾기
      console.log(dataList);
      // const rowData = dataList.find(
      //   (item) => item.orderIndex === row.orderIndex
      // );
      // console.log(rowData);

      // // 데이터를 삭제하고 업데이트된 배열을 생성합니다.
      // const updatedData = dataList.filter(
      //   (item) => item.orderIndex !== row.orderIndex
      // );

      // setDataList(updatedData);
    };

    return (
      <div className="inset-0 flex items-center justify-center text-lg">
        {/* <Tooltip title="삭제"> */}
        <span
          className="cursor-pointer p-2 hover:text-red-500"
          onClick={() => onDelete(row.orderIndex)}
        >
          {/* <HiOutlineTrash /> */} 삭제
        </span>
        {/* </Tooltip> */}
      </div>
    );
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
                    onClick={onAdd}
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
                                        handleInputChange(
                                          "process",
                                          e.target.value,
                                          index
                                        )
                                      }
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
                                        handleInputChange(
                                          "actor",
                                          e.target.value,
                                          index
                                        )
                                      }
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
                                        handleInputChange(
                                          "content",
                                          e.target.value,
                                          index
                                        )
                                      }
                                    />
                                  </td>
                                  {/* 파일 */}
                                  <td className="border border-gray-200 w-2/12 py-2">
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <input
                                        multiple
                                        className="focus:border border-gray-300"
                                        type="file"
                                        style={{
                                          display: "none",
                                        }}
                                        id={`fileInput-${index}`}
                                        accept="*/*"
                                        onChange={(e) =>
                                          handleFileChange(e, index)
                                        }
                                      />
                                      <label
                                        htmlFor={`fileInput-${index}`}
                                        className="cursor-pointer flex items-center"
                                      >
                                        &nbsp; &nbsp;
                                        {/* <HiOutlineUpload className="text-2xl mr-1" /> */}
                                        <span
                                          id="fileNameDisplay"
                                          style={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxWidth: "200px",
                                          }}
                                        >
                                          {data.filePath
                                            ? data.filePath.split("/")[
                                                data.filePath.split("/")
                                                  .length - 1
                                              ]
                                            : "파일"}
                                        </span>
                                      </label>
                                    </div>
                                  </td>
                                  {/* 비고 */}
                                  <td className="border border-gray-200 w-2/12 py-2">
                                    <input
                                      className="focus:border border-gray-300"
                                      type="text"
                                      style={inputStyle}
                                      value={data.note}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "note",
                                          e.target.value,
                                          index
                                        )
                                      }
                                    />
                                  </td>
                                  <td
                                    className="border border-gray-200 w-1/12 py-2 text-center"
                                    style={{
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <div>
                                      <ActionColumn row={data} />
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
