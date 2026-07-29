import * as core from "@actions/core";
import * as github from "@actions/github";
import { readReleaseMetadata } from "./metadata";
import { notNull, uniq } from "./util";

const token = core.getInput("token", { required: true });

const octokit = github.getOctokit(token);

const { repo, ref, sha } = github.context;

async function getTagName() {
  const tag = core.getInput("tag");
  const from = core.getInput("from");

  if (tag) {
    core.info(`using tag '${tag}'`);
    return tag;
  }

  if (from) {
    const metadata = await readReleaseMetadata(from);
    const [tag, ...rest] = uniq(
      Object.values(metadata)
        .map((it) => it.tag)
        .filter(notNull),
    );

    if (!tag) {
      throw new Error(`${from} file did not define any tags`);
    }

    if (rest.length > 0) {
      const tags = [tag, ...rest];
      core.error(`found multiple tags in ${from}: [${tags.join(", ")}]`);
    }

    core.info(`found tag '${tag}' in ${from}'`);
    return tag;
  }

  throw new Error(`either 'from' or 'tag' input must be set`);
}

const tagName = await getTagName();

await octokit.rest.git.createRef({
  ...repo,
  ref: `refs/tags/${tagName}`,
  sha,
});

core.setOutput("tag", tagName);
