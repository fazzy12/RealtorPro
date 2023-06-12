import { useState } from 'react';
import { useGetIdentity } from '@pankod/refine-core';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';
import Form from 'components/common/Form';
import { useNavigate } from '@pankod/refine-react-router-v6';

const CreateProperty = () => {
  const navigate = useNavigate();

  // Get the authenticated user's identity
  const { data: user } = useGetIdentity();

  // State for property image
  const [propertyImage, setPropertyImage] = useState({ name: '', url: '' });

  // Form management using refine-react-hook-form
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  // Handle property image change
  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result: string) => setPropertyImage({ name: file?.name, url: result }));
  };

  // Handle form submission
  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) return alert('Please upload a property image');

    await onFinish({ ...data, photo: propertyImage.url, email: user.email });

    navigate('/properties');
  };

  return (
    <Form
      type="Create"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};

export default CreateProperty;
