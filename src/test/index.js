import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import chaiEnzyme from "chai-enzyme";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import sinon from "sinon";
import sinonStubPromise from "sinon-stub-promise";

Enzyme.configure({ adapter: new Adapter() });

chai.use(chaiEnzyme());
chai.use(sinonChai);

sinonStubPromise(sinon);

export { expect, shallow, sinon };
