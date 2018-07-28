import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout
        title="Basic form"
        content="Form pages are used to collect or verify information"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="title">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter title',
                  },
                ],
              })(<Input placeholder="Give the target data a name" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Start and end date">
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: 'Please select start end date',
                  },
                ],
              })(<RangePicker style={{ width: '100%' }} placeholder={['Start date', 'End date']} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Target description">
              {getFieldDecorator('goal', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter the description of the goal',
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="Please enter work goals"
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Metrics">
              {getFieldDecorator('standard', {
                rules: [
                  {
                    required: true,
                    message: 'Enter metrics',
                  },
                ],
              })(<TextArea style={{ minHeight: 32 }} placeholder="Enter metrics" rows={4} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  client
                  <em className={styles.optional}>
                    （optional）
                    <Tooltip title="target service">
                      <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator('client')(
                <Input placeholder="Describe customer type，internal customer Name／Job" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  Inviting critics
                  <em className={styles.optional}>（optional）</em>
                </span>
              }
            >
              {getFieldDecorator('invites')(
                <Input placeholder="Please enter name and job number" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  权重
                  <em className={styles.optional}>（选填）</em>
                </span>
              }
            >
              {getFieldDecorator('weight')(<InputNumber placeholder="请输入" min={0} max={100} />)}
              <span className="ant-form-text">%</span>
            </FormItem>
            <FormItem {...formItemLayout} label="目标公开" help="客户、邀评人默认被分享">
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">公开</Radio>
                    <Radio value="2">部分公开</Radio>
                    <Radio value="3">不公开</Radio>
                  </Radio.Group>
                )}
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('publicUsers')(
                    <Select
                      mode="multiple"
                      placeholder="公开给"
                      style={{
                        margin: '8px 0',
                        display: getFieldValue('public') === '2' ? 'block' : 'none',
                      }}
                    >
                      <Option value="1">同事甲</Option>
                      <Option value="2">同事乙</Option>
                      <Option value="3">同事丙</Option>
                    </Select>
                  )}
                </FormItem>
              </div>
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
