import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "../../../components/ui/modal/Modal";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
function Department() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };

  // add department
  const handleNewDepartment = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/departments",
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201 && response.data.success) {
        toast.success("success");
      } else {
        toast.error(response?.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    values,
    errors,
    touched,
    isValid,
  } = useFormik({
    initialValues: {
      departmentName: "",
      description: "",
    },
    validationSchema: null,
    onSubmit: handleNewDepartment,
  });
  return (
    <div className="lg:px-10 py-2 ">
      <div className="flex flex-1 justify-between items-center px-3 w-full ">
        <div className="pl-1 flex flex-1 justify-start items-center relative">
          <input
            type="text"
            className=" h-8 border border-black rounded px-1"
            placeholder="Search"
          />
          <FaSearch size={20} className="absolute left-[164px]" />
        </div>
        <div>
          <button>
            <IoIosAddCircle size={30} onClick={handleModalOpen} />
          </button>
          {isOpen && (
            <Modal
              isOpen={isOpen}
              onClose={handleModalClose}
              title="New department"
            >
              <div>
                <div>
                  <form
                    className="flex flex-col w-full gap-2"
                    onSubmit={handleSubmit}
                  >
                    <label htmlFor="departmentName">Depatment Name</label>
                    <input
                      name="departmentName"
                      type="text"
                      className="border border-black rounded-md p-1"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <label htmlFor="description">Depatment description</label>
                    <textarea
                      className="border border-black rounded-md p-1"
                      rows="6"
                      name="description"
                      placeholder="write something ....."
                      onBlur={handleBlur}
                      onChange={handleChange}
                    ></textarea>

                    <button
                      className="px-6 py-1.5 bg-black text-white rounded w-fit"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default Department;
